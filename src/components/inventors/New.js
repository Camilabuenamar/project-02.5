import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

class InventorsNew extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value}
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ formData, errors})
  }

  handleSubmit(e) {
    e.preventDefault()

    const token = Auth.getToken()

    axios.post('api/inventors', this.state.formData, {
      headers: {Authorization: `Bearer ${token}` }
    })
      .then(() => this.props.history.push('/inventors'))
      .catch(err => this.setState({ errors: err.response.data.errors}))
  }

  render() {
    console.log(this.state)
    return (
      <section className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  name="name"
                  placeholder="eg: Ada Lovelace"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.name && <small className="help is-danger">{this.state.errors.name}</small>}
            </div>
            <div className="field">
              <label className="label">life</label>
              <div className="control">
                <input
                  className="input"
                  name="life"
                  placeholder="1815 - 1852"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.life && <small className="help is-danger">{this.state.errors.life}</small>}
            </div>
            <div className="field">
              <label className="label">Image</label>
              <div className="control">
                <input
                  className="input"
                  type="input"
                  name="image"
                  placeholder="eg: https//inventorspics.com/images/Ada-Lovelace.png"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.image && <small className="help is-danger">{this.state.errors.image}</small>}
            </div>
            <div className="field">
              <label className="label">Inventions</label>
              <div className="control">
                <input
                  className="input"
                  name="inventions"
                  placeholder="First Computer Programmer"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.inventions && <small className="help is-danger">{this.state.errors.inventions}</small>}
            </div>
            <div className="field">
              <label className="label">Bio</label>
              <div className="control">
                <input
                  className="textarea"
                  name="bio"
                  placeholder="eg: English mathematician, an associate of Charles Babbage, for whose prototype of a digital computer she created a program. She has been called the first computer programmer. Babbage only built a small part of the Analytical Engine, but Lovelace’s efforts have been remembered. The early programming language Ada was named for her, and the second Tuesday in October has become Ada Lovelace Day, on which the contributions of women to science, technology, engineering, and mathematics are honoured."
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.bio && <small className="help is-danger">{this.state.errors.bio}</small>}
            </div>

            <button className="button is-primary">Submit</button>
          </form>
        </div>
      </section>
    )
  }
}

export default InventorsNew
