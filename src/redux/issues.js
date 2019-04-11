import { createAction, createReducer } from 'redux-starter-kit'
import axios from '../utils/axios'

//export for testing
export const getIssuesRequest = createAction('getIssuesRequest')
export const getIssuesSuccess = createAction('getIssuesSuccess')
export const getIssuesError = createAction('getIssuesError')
export const setRepo = createAction('setRepo')

export const getIssues = (owner, repo) => (dispatch, getState) => {
  dispatch(getIssuesRequest())
  dispatch(setRepo(repo))
  //use cache or make get req
  const cachedIssues = getIssuesFromStorage(repo)
  cachedIssues
    ? dispatch(getIssuesSuccess(cachedIssues))
    : axios.get(`repos/${owner}/${repo}/issues?access_token=${getState().key.key}`)
      .then(res => dispatch(getIssuesSuccess(res.data)))
      .catch(e => dispatch(getIssuesError(e)))
}
export const updateIssues = (issues) => (dispatch, getState) => {
  //update state and cache
  dispatch(getIssuesSuccess(issues))
  storeIssues(getState().issues.repo, issues)
}

//side effects
const storeIssues = (repo, issues) => {
  localStorage.setItem(repo, JSON.stringify(issues))
}
const getIssuesFromStorage = (repo) => {
  const value = localStorage.getItem(repo)
  return value && JSON.parse(value)
}

const initialState = {
  isLoading: false, 
  issues: [], 
  repo: null, 
  error: null
}
const issuesReducer = createReducer(initialState, {
  [setRepo]: (state, action) => { state.repo = action.payload },
  [getIssuesRequest]: (state) => { state.isLoading = true },
  [getIssuesSuccess]: (state, action) => {
    state.isLoading = false
    state.issues = action.payload
  },
  [getIssuesError]: (state, action) => {
    state.isLoading = false
    state.error = action.payload
  }
})

export default issuesReducer