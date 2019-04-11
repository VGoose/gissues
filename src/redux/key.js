import { createAction, createReducer } from 'redux-starter-kit'
import axios from '../utils/axios'
import { getReposSuccess } from './repos'

//export for testing
export const validateKeyRequest = createAction('validateKeyRequest')
export const validateKeySuccess = createAction('validateKeySuccess')
export const validateKeyError = createAction('validateKeyError')

export const validateKey = (key) => dispatch => {
  dispatch(validateKeyRequest())
  axios.get(`user/repos?access_token=${key}`)
    .then(res => {
      dispatch(getReposSuccess(res.data))
      dispatch(validateKeySuccess(key))
      dispatch(validateKeyError(null))
      storeKey(key)
    })
    .catch(e => dispatch(validateKeyError(e)))
}

export const invalidateKey = () => dispatch => {
  dispatch(validateKeySuccess(null))
  localStorage.removeItem('key')
}

const storeKey = (key) => {
  localStorage.setItem('key', key)
}
export const getKeyFromStorage = () => dispatch => {
  const value = localStorage.getItem('key')
  if (value) {
    dispatch(validateKey(value))
  } else {
    dispatch(validateKeyError(null))
  }
}
const initialState = { 
  isLoading: true, //buy time to check auth on refresh - prevent flashing
  key: null, 
  error: null 
}
const keyReducer = createReducer(initialState, {
  [validateKeyRequest]: (state) => { state.isLoading = true },
  [validateKeySuccess]: (state, action) => {
    state.isLoading = false
    state.key = action.payload
  },
  [validateKeyError]: (state, action) => {
    state.isLoading = false
    state.error = action.payload
  }
})

export default keyReducer