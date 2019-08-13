/* global api, describe, it, expect, beforeEach, afterEach */
const Inventor = require('../../models/Inventor')
const inventorsData = require('../../db/data/inventorsData')


describe('SHOW /inventors/:id', () => {

  let inventor = null

  //adds Data beofre each Test
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

  it('should return a 200 response', done => {
    api.get(`/inventors/${inventor._id}`)
      .end((err,res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an object', done => {
    api.get(`/inventors/${inventor._id}`)
      .end((err,res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api.get(`/inventors/${inventor._id}`)
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
    api.get(`/inventors/${inventor._id}`)
      .end((err, res) => {
        expect(res.body.name).to.eq(inventor.name)
        expect(res.body.lines).to.deep.eq(inventor.lines)
        expect(res.body.zones).to.deep.eq(inventor.zones)
        expect(res.body.isNightTube).to.eq(inventor.isNightTube)
        expect(res.body.latitude).to.eq(inventor.latitude)
        expect(res.body.longitude).to.eq(inventor.longitude)
        done()
      })
  })

})
