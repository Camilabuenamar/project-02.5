import React from 'react'

const Card = ({ name, life, image, inventions }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-title is-2">{name}</div>
        <div className="card-header-title is-3">{life}</div>
      </div>
      <div className="card-image">
        <figure className="image">
          <img src={image} alt={name} />
        </figure>
      </div>
      <div className="card-content">
        <div className="content is-4">{inventions}</div>
      </div>
    </div>
  )
}

export default Card
