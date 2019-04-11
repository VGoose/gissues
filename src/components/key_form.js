import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import styled from 'styled-components'
import Button from './button'
import { validateKey } from '../redux/key'


const KeyForm = ({ dispatch, error }) => {
  const [key, setKey] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(validateKey(key))
  }
  return (
    <FormWrapper>
      <Form>
        <Header>Enter Your Github API Key</Header>
        <Label>API KEY</Label>
        <Input error={error} type="text" value={key} onChange={e => setKey(e.target.value)} />
        <Button big type="submit" onClick={(e) => handleSubmit(e)}>Submit</Button>
      </Form>
    </FormWrapper>
  )
}

const FormWrapper = styled.div`
  background: transparent;
  border-radius: 10px;
  border: 0.2rem solid #FF5313;
  padding: 0 1.5rem;
  color: black;
  width: 100%;
  @media (min-width: 480px) {
    width: 400px;
  }
`
const Header = styled.h2`
  text-align: center;
`
const Label = styled.label`
  display: block;
  margin: 0.3rem 0;
`
const Form = styled.form`
  
`
const Input = styled.input`
  width: 100%;
  min-height: 3rem;
  box-sizing: border-box;    
  font-size: 1rem;
  padding: 0.75rem;
  border: 0.1rem solid #ddd;
  border-radius: 0.5rem;
  background: ${props => props.error ? '#f555' : 'transparent'};
`

KeyForm.propTypes = {
  handleSubmit: PropTypes.func
}

const mapStateToProps = (state) => ({
  error: state.key.error,
})

export default connect(mapStateToProps, null)(KeyForm)
