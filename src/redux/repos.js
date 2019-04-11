import { createAction, createReducer } from 'redux-starter-kit'

//export for testing
export const getReposRequest = createAction('getReposRequest')
export const getReposSuccess = createAction('getReposSuccess')
export const getReposError = createAction('getReposError')

const initialState = {
  isLoading: false,
  repos: [],
  error: null
}
const reposReducer = createReducer(initialState, {
  [getReposRequest]: (state) => { state.isLoading = true },
  [getReposSuccess]: (state, action) => {
    state.isLoading = false
    state.repos = action.payload
  },
  [getReposError]: (state, action) => {
    state.isLoading = false
    state.error = action.payload
  }
})

export default reposReducer