import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import Auth from '../../lib/Auth'

class NavBar extends React.Component {

  constructor(){
    super()
    this.state = {navbarOpen: false}
    this.logout = this.logout.bind(this)
    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  logout(){
    Auth.removeToken()
    this.props.history.push('/')
  }

  toggleNavbar() {
    this.setState({ navbarOpen: !this.state.navbarOpen})
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ navbarOpen: false})
    }
  }

  render () {
    return (
      <nav className="navbar is-primary">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">💪🏾</Link>

            <a
              role="button"
              className={`navbar-burger ${this.state.navbarOpen ? 'is-active' : ''}`}
              onClick={this.toggleNavbar}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>

          </div>

          <div className={`navbar-menu ${this.state.navbarOpen ? 'is-active' : ''}`}>
            <div className="navbar-start">
              <Link to="/inventors" className="navbar-item">BROWSE</Link>
              {Auth.isAuthenticated() && <Link to="/inventors/new" className="navbar-item">ADD</Link>}
            </div>
            <div className="navbar-end">
              {!Auth.isAuthenticated() && <Link to="/register" className="navbar-item">REGISTER</Link>}
              {!Auth.isAuthenticated() && <Link to="/login" className="navbar-item">LOGIN</Link>}
              {Auth.isAuthenticated() && <button onClick={this.logout} className="navbar-item button is-danger">Logout</button>}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(NavBar)
