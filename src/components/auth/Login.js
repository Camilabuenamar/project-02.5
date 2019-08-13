import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const formData = {...this.state.formData, [e.target.name]: e.target.value}
    this.setState({ formData, error: '' })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('api/login', this.state.formData)
      .then(res => {
        Auth.setToken(res.data.token)
        // localStorage.setItem('token', res.data.token) // store the token in local localStorage
        this.props.history.push('/cheeses') // redirect to the cheeses INDEX page
      })
      .catch(() => {
        Auth.removeToken()
        // localStorage.removeItem('token') // remove token from local localStorage
        this.setState({ error: 'Invalid credentials'}) // display an error
      })
  }

  render() {
    console.log(this.state)
    return (
      <section className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  name="email"
                  placeholder="eg: camila@camilabuenamar.com"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  name="password"
                  placeholder="eg: ••••••••"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.error && <small className="help is-danger">{this.state.error}</small>}
            </div>
            <button className="button is-primary">Submit</button>
          </form>
        </div>
      </section>
    )
  }
}

export default Login
