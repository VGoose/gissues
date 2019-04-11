import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import moment from 'moment'
import avatar from '../assets/blank_avatar.png'
import comment from '../assets/comment.png'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { updateIssues } from '../redux/issues'

const IssuesViewer = ({ issues, showIssues, dispatch }) => {
  const onDragEnd = (result) => {
    const { source, destination } = result
    if(!destination || source.index === destination.index) {
      return
    }
    const updatedIssues = [...issues]
    const draggedIssue = updatedIssues.splice(source.index, 1)
    updatedIssues.splice(destination.index, 0, ...draggedIssue)
    dispatch(updateIssues(updatedIssues))
  }
  const _issues = issues.length === 0
    ? <h3>There are no issues for this repository.</h3>
    : issues.map((issue, index) => {
      const { id, assignee, title, created_at, updated_at, comments } = issue
      return (
        <Draggable key={id} draggableId={id} index={index}>
          {provided => (
            <IssueItem 
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <div>
                <figure>
                  <img src={assignee ? assignee.avatar_url : avatar} alt="avatar" />
                  <figcaption>{assignee ? null : 'None Assigned'}</figcaption>
                </figure>
                <h3>{title}</h3>
              </div>
              <div>
                <img className="comment-img" src={comment} alt="comment" />
                <p>{comments}</p>
                <p>opened {moment(created_at).fromNow()}</p>
                <p>updated {moment(updated_at).fromNow()}</p>
              </div>
            </IssueItem>
          )}
        </Draggable>
      )
    })
  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId='issues'>
        {provided => (
          <IssuesColumn
            show={showIssues}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2>Issues</h2>
            {_issues}
            {provided.placeholder}
          </IssuesColumn>
        )}
      </Droppable>
    </DragDropContext>
  )
}

const IssuesColumn = styled.ul`
  display: ${props => props.show ? 'block' : 'none'};
  height: 600px;
  overflow-y: scroll;
  margin: 1rem auto;
  min-width: 300px;
  width: 40vw;
  list-style: none;
  background-color: #FF531333;
  padding: 1rem 0.5rem;
  border-radius: 0.25rem;
  @media (min-width: 800px) {
  }
  & h3 {
    font-size: 0.8rem;
  }
`
const IssueItem = styled.li`
  width: 100%;
  background-color: #fff;
  padding: 0.5rem;
  text-align: left;
  margin: 0 0 0.5rem;
  border-radius: 0.25rem;
  & > div {
    display: flex;
    flex-wrap: wrap;
  }; 
  & p {
    font-size: 9px;
    margin: 0 0.5rem;
  }
  & figure {
    font-size: 0.5rem;
    display: inline-block;
    border-radius: 4px;
    margin: 0 0.5rem 0.5rem 0;
  };
  & img {
    width: 40px;
    height: 40px;
  }
  & .comment-img {
    width: 16px;
    height: 16px;
  }
`
IssuesViewer.propTypes = {
  issues: PropTypes.array,
  showIssues: PropTypes.bool,
  dispatch: PropTypes.func,
}

const mapStateToProps = state => ({
  issues: state.issues.issues,
})

export default connect(mapStateToProps, null)(IssuesViewer)
