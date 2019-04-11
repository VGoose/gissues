import React from 'react'
import App from './App'
import renderer from 'react-test-renderer'
import store from './store'
import { Provider } from 'react-redux'

import { validateKeyError, validateKeySuccess } from './redux/key'


//renderer.create doesn't like nested components? 
const defaultStore = {...store}
it('first visit render tree', () => {
  const MyApp = () => <Provider store={defaultStore}><App /></Provider>
  const tree = renderer.create(<MyApp />).toJSON()
  expect(tree).toMatchSnapshot()
})

// const store2 = {...store}
// store2.dispatch(validateKeyError('err'))
// const MyApp2 = () => <Provider store={store2}><App /></Provider>
// it('is not authed render tree', () => {
//   const tree = renderer.create(<MyApp2 />).toJSON()
//   expect(tree).toMatchSnapshot()
// })
// store.dispatch(validateKeySuccess('foo'))
// const MyApp3 = () => <Provider store={store}><App /></Provider>
// it('is authed render tree', () => {
//   const tree = renderer.create(<MyApp />).toJSON()
//   expect(tree).toMatchSnapshot()
// })