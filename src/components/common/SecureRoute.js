import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import Auth from '../../lib/Auth'
import {toast} from 'react-toastify'

const SecureRoute = (props) => {
  //If logged in, return a Route with the same props as secureRoute
  if (Auth.isAuthenticated()) return <Route {...props} />
  // otherwise redirect to login
  toast('Oh! remember to login first!')
  toast.success('success')
  toast.info('info')
  toast.warn('warn')
  toast.error('error')
  return <Redirect to="/login"/>
}

export default SecureRoute
