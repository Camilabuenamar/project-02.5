import React from 'react'
import ReactDOM from 'react-dom'

import {HashRouter, Route, Switch} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

import {ToastContainer} from 'react-toastify'

import InventorsIndex from './components/inventors/Index'
import InventorsShow from './components/inventors/Show'
import InventorsNew from './components/inventors/New'
import InventorsEdit from './components/inventors/Edit'
import Home from './components/pages/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import NavBar from './components/common/Navbar'
import SecureRoute from './components/common/SecureRoute'


import 'bulma'
import './style.scss'

class App extends React.Component {


  render() {
    return (
      <HashRouter>
        <NavBar />
        <ToastContainer />
        <Switch>
          <SecureRoute path='/inventors/new' component={InventorsNew} />
          <SecureRoute path='/inventors/:id/edit' component={InventorsEdit} />
          <Route path='/inventors/:id' component={InventorsShow} />
          <Route path='/inventors' component={InventorsIndex} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/' component={Home} />
        </Switch>
      </HashRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
