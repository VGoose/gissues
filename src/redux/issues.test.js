import { getIssuesRequest, getIssuesError, getIssuesSuccess, setRepo } from './issues'
import issuesReducer from './issues'

const initialState = {
  isLoading: false,
  issues: [],
  repo: null,
  error: null
}
describe('keyReducer', () => {
  it('returns same state given no type', () => {
    expect(issuesReducer({}, {})).toEqual({})
  })
  it('handles getIssuesError', () => {
    expect(issuesReducer(undefined, { type: getIssuesError, payload: 'oops' })).toEqual(
      {
        ...initialState,
        error: 'oops',
        isLoading: false
      }
    )
  })
  it('handles getIssuesRequest', () => {
    expect(issuesReducer(undefined, { type: getIssuesRequest })).toEqual(
      {
        ...initialState,
        isLoading: true
      }
    )
  })
  it('handles getIssuesSuccess', () => {
    expect(issuesReducer(undefined, { type: getIssuesSuccess, payload: ['foo'] })).toEqual(
      {
        ...initialState,
        isLoading: false,
        issues: ['foo'],
      }
    )
  })
  it('handles setRepo', () => {
    expect(issuesReducer(undefined, { type: setRepo, payload: 'bar' })).toEqual(
      {
        ...initialState,
        repo: 'bar',

      }
    )
  })
})