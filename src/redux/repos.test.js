import { getReposError, getReposSuccess, getReposRequest } from './repos'
import reposReducer from './repos'

const initialState = {
  isLoading: false,
  repos: [],
  error: null
}
describe('keyReducer', () => {
  it('returns same state given no type', () => {
    expect(reposReducer({}, {})).toEqual({})
  })
  it('handles getReposError', () => {
    expect(reposReducer(undefined, { type: getReposError, payload: 'oops' })).toEqual(
      {
        ...initialState,
        error: 'oops',
        isLoading: false
      }
    )
  })
  it('handles getReposRequest', () => {
    expect(reposReducer(undefined, { type: getReposRequest })).toEqual(
      {
        ...initialState,
        isLoading: true
      }
    )
  })
  it('handles getReposSuccess', () => {
    expect(reposReducer(undefined, { type: getReposSuccess, payload: ['foo'] })).toEqual(
      {
        ...initialState,
        isLoading: false,
        repos: ['foo'],
      }
    )
  })
})