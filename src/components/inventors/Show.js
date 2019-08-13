import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/Auth'


class InventorsShow extends React.Component {
  constructor() {
    super()

    this.state = {}
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    axios.get(`api/inventors/${this.props.match.params.id}`)
      .then(res => this.setState({ inventor: res.data}))
  }

  handleDelete() {
    const token = Auth.getToken()

    axios.delete(`api/inventors/${this.props.match.params.id}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
      .then(() => this.props.history.push('/inventors'))
  }

  render() {
    if(!this.state.inventor) return null
    return (
      <section className="section">
        <div className="container">
          <h1 className="title is-2">{this.state.inventor.name}</h1>
          <h2 className="subtitle is-4">{this.state.inventor.life}</h2>

          {Auth.isCurrentUser(this.state.inventor.user) &&
            <div className="buttons">
              <Link to={`/inventors/${this.state.inventor._id}/edit`} className="button">Edit</Link>
              <button onClick={this.handleDelete} className="button is-danger">Delete</button>
            </div>
          }
          <hr />
          <div className="columns">
            <div className="column">
              <figure className="image">
                <img src={this.state.inventor.image} alt={this.state.inventor.name} />
              </figure>
            </div>
            <div className="column">
              <p className="is-4">{this.state.inventor.inventions}</p>
              <p>{this.state.inventor.bio}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default InventorsShow
