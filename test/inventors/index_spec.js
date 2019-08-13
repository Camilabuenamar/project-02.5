/* global api, describe, it, expect, beforeEach, afterEach */
const Inventor = require('../../models/Inventor')
const inventorsData = require('../../db/data/inventorsData')

describe('GET /inventors', () => {

  //adds Data beofre each Test
  beforeEach(done => {
    Inventor.create(inventorsData)
      .then(() => done())
  })

  afterEach(done => {
    Inventor.remove({})
      .then(() => done())
  })

  it('should return a 200 response', done => {
    api.get('/inventors')
      .end((err,res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an array', done => {
    api.get('/inventors')
      .end((err,res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('should return an array of objects', done => {
    api.get('/inventors')
      .end((err,res) => {
        res.body.forEach(inventor => {
          expect(inventor).to.be.an('object')
        })
        done()
      })
  })

  it('should return the correct fields', done => {
    api.get('/inventors')
      .end((err,res) => {
        res.body.forEach(inventor => {
          expect(inventor).to.contains.keys([
            '_id',
            'name',
            'life',
            'inventions',
            'bio'
          ])
        })
        done()
      })
  })

  it('should contain correct data' , done => {
    api.get('/inventors')
      .end((err,res) => {
        res.body.forEach( inventor => {
          expect(inventor._id).to.be.an('string')
          expect(inventor.name).to.be.an('string')
          expect(inventor.life).to.be.an('string')
          expect(inventor.inventions).to.be.an('array')
          expect(inventor.bio).to.be.an('string')
        })
        done()
      })
  })

})
