import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { connect } from 'react-redux'
import KeyForm from './components/key_form.js'
import ReposViewer from './components/repos_viewer'
import Button from './components/button.js'
import { invalidateKey, getKeyFromStorage } from './redux/key.js'

//export for testing
export const App = ({ authenticated, dispatch, keyIsLoading }) => {
  //check if authed on mount
  React.useEffect(() => {
    dispatch(getKeyFromStorage())
  }, [])
  return (
    <Wrapper className="App">
      <GlobalStyle />
      < Header > Gissues</Header >
      {
        authenticated
          ? <React.Fragment >
            <Description>Click on an repo to view issues!</Description>
            <Button onClick={() => dispatch(invalidateKey())}>Use new Key</Button>
            <ReposViewer />
          </React.Fragment >
          
          : keyIsLoading
            ? <div></div>
            : <KeyForm />}
    </Wrapper >
  )
}

const GlobalStyle = createGlobalStyle`
  * {
        box-sizing: border-box;
    }
  `

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 900px;
    margin: 0 auto;
    padding: 0 2rem;
  `
const Header = styled.h1`
    font-size: 4rem;
    color: #FF5313;
  `
const Description = styled.p`
  
  `
const mapStateToProps = state => ({
  authenticated: state.key.key,
  keyIsLoading: state.key.isLoading,
})

export default connect(mapStateToProps, null)(App)
