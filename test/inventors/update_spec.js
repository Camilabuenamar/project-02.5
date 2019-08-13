/* global api, describe, it, expect, beforeEach, afterEach */
const Inventor = require('../../models/Inventor')
const inventorsData = require('../../db/data/inventorsData')
const jwt = require('jsonwebtoken')
const {secret} = require('../../config/environment')
const testData = {
  name: 'Camila Buenaventura Marquez',
  life: '1995 - ',
  inventions: [ 'Guacamole Ice Cream', 'Hot Chocolate with cheese' ],
  bio: 'In 1995 a beautiful girl called Camila was borned in Colombia, since that day the world was never the same.'
}

describe('PUT /inventors/:id', () => {

  let inventor = null
  const token = jwt.sign({ sub: 123}, secret, { expiresIn: '6h' })

  beforeEach(done => {
    Inventor.create(inventorsData)
      .then(inventors => {
        inventor = inventors[0]
        done()
      })
  })

  afterEach(done => {
    Inventor.remove({})
      .then(() => done())
  })

  it('should return a 401 response without a token', done => {
    api.put(`/inventors/${inventor._id}`)
      .end((err,res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 200 response with a token', done => {
    api.put(`/inventors/${inventor._id}`)
      .set('Authorization', `Bearer ${token}`) // .set knows to put it i the header
      .send(testData)
      .end((err,res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an object', done => {
    api.put(`/inventors/${inventor._id}`)
      .set('Authorization', `Bearer ${token}`) // .set knows to put it i the header
      .send(testData)
      .end((err,res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api.put(`/inventors/${inventor._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err,res) => {
        expect(res.body).to.contain.keys([
          '_id',
          'name',
          'life',
          'inventions',
          'bio'
        ])
        done()
      })
  })

  it('should return the correct data', done => {
    api.put(`/inventors/${inventor._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.body.name).to.eq(testData.name)
        expect(res.body.life).to.eq(testData.life)
        expect(res.body.inventions).to.deep.eq(testData.inventions)
        expect(res.body.bio).to.eq(testData.bio)
        done()
      })
  })

})
