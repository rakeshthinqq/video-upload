import React from 'react'
import ReactDOM from 'react-dom'
// Data store
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
// Router
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
// Redux
import * as reducers from '~/store/reducers'
const reducer = combineReducers({ ...reducers })

import {
  views
} from './components'

import './theme/base.scss'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const history = createBrowserHistory()

const {
  Authentication,
  Dashboard
} = views

const App = (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact name='auth' path='/' component={Authentication} />
        <Route exact name='dashboard' path='/home' component={Dashboard} />
      </Switch>
    </Router>
  </Provider>
)

ReactDOM.render(App, document.getElementById('root'))
