import React from 'react'
import {Link} from 'react-router-dom'
import Card from './Card'
import axios from 'axios'


class InventorsIndex extends React.Component {
  constructor() {
    super()

    this.state = { inventors: [] }
  }

  componentDidMount() {
    axios.get('api/inventors')
      .then(res => this.setState({ inventors: res.data}))
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">
            {this.state.inventors.map(inventors =>
              <div
                key={inventors._id}
                className="column is-one-third-tablet is-one-third-desktop"
              >
                <Link to={`/inventors/${inventors._id}`}>
                  <Card name={inventors.name} life={inventors.life} image={inventors.image} inventions={inventors.inventions} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }
}

export default InventorsIndex
