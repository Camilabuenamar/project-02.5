/* global api, describe, it,  expect, afterEach */

const User = require('../../models/User')

const testData = {
  username: 'test',
  email: 'test@test.com',
  password: 'test',
  passwordConfirmation: 'test'
}
const wrongTestData = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: ''
}
const wrongTestData2 = {
  username: 'test1',
  email: 'test1@test.test',
  password: '12345',
  passwordConfirmation: '1234'
}

describe('POST /register', () => {


  afterEach(done => {
    User.remove({})
      .then(() => done())
  })

  it('should return a successful response', done => {
    api.post('/register')
      .send(testData)
      .end((err,res) => {
        console.log(res.body.message)
        expect(res.body.message).to.eq('Registration successful')
        done()
      })
  })

  it('should return a 422 response', done => {
    api.post('/register')
      .send(wrongTestData)
      .end((err,res) => {
        console.log(res.body.message)
        expect(res.status).to.eq(422)
        done()
      })
  })

  it('should return Passwords doesnt match', done => {
    api.post('/register')
      .send(wrongTestData2)
      .end((err,res) => {
        console.log(res.body.message)
        expect(res.body.message).to.eq('User validation failed: passwordConfirmation: Passwords do not match')
        done()
      })
  })

})
