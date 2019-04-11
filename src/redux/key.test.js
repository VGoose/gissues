import { validateKeyError, validateKeyRequest, validateKeySuccess } from './key'
import keyReducer from './key'

const initialState = { 
  isLoading: true, 
  key: null, 
  error: null 
}

describe('keyReducer', () => {
  it('returns same state given no type', () => {
    expect(keyReducer({}, {})).toEqual({})
  })
  it('handles validateKeyError', () => {
    expect(keyReducer(undefined, { type: validateKeyError, payload: 'oops' })).toEqual(
      {
        ...initialState, 
        error: 'oops',
        isLoading: false
      }
    )
  })
  it('handles validateKeyRequest', () => {
    expect(keyReducer(undefined, { type: validateKeyRequest})).toEqual(
      {
        ...initialState,
        isLoading: true
      }
    )
  })
  it('handles validateKeySuccess', () => {
    expect(keyReducer(undefined, { type: validateKeySuccess, payload: 'foo'})).toEqual(
      {
        ...initialState,
        isLoading: false,
        key: 'foo',
      }
    )
  })
})