import { combineReducers } from 'redux'

import issues from './issues'
import key from './key'
import repos from './repos'

const rootReducer = combineReducers({
  key,
  repos,
  issues
})

export default rootReducer


