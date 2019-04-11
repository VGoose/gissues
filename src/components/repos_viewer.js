import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getIssues } from '../redux/issues'
import IssuesViewer from './issues_viewer'


const ReposViewer = ({ repos, dispatch }) => {
  const [showIssues, toggleShowIssues] = React.useState(false)
  const [activeRepo, setActiveRepo] = React.useState(null)

  const handleClick = (owner, repo) => {
    setActiveRepo(repo)
    toggleShowIssues(activeRepo !== repo || !showIssues)
    dispatch(getIssues(owner, repo))
  }
  const _repos = repos.map(r => {
    const { name: repo, owner, description, id } = r
    const { login: _owner } = owner
    return <li key={id}>
      <RepoButton
        activeRepo={activeRepo === repo && showIssues}  
        onClick={() => handleClick(_owner, repo)}
      >
        <h3>
          {repo}
        </h3>
        <p>
          {description}
        </p>
      </RepoButton>
    </li>
  })

  return (
    <Container>
      <ReposColumn>
        <h2>Repos</h2>
        {_repos}
      </ReposColumn>
      <IssuesViewer showIssues={showIssues} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
`
const ReposColumn = styled.ul`
  height: 600px;
  overflow-y: scroll;
  margin: 1rem auto;
  min-width: 300px;
  width: 40vw;
  list-style: none;
  background-color: #eee;
  padding: 1rem 0.5rem;
  margin-right: 1rem;
  border-radius: 0.25rem;
  @media (min-width: 800px) {
  }
`
const RepoButton = styled.button`
  width: 100%;
  background-color: ${props => props.activeRepo ? '#FF531355' : '#fff'};
  padding: 0.5rem;
  text-align: left;
  margin: 0 0 0.5rem;
  border: 0;
  border-radius: 0.25rem;
`



ReposViewer.propTypes = {
  repos: PropTypes.array,
  dispatch: PropTypes.func,
}

const mapStateToProps = state => ({
  repos: state.repos.repos,
})

export default connect(mapStateToProps, null)(ReposViewer)
