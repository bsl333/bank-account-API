process.env.PORT = 3001
process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

const server = require('../app')
const data = require('../src/data/data')

chai.use(chaiHttp)

describe('Account Routes', () => {
  context('INDEX\tGET\t/account/', () => {
    it('should list all accounts', (done) => {
      chai.request(server)
        .get('/account')
        .end((err, res) => {
          const expected = { status: 200, data: data }
          const { body, status } = res
          status.should.equal(200)
          body.data.should.deep.equal(expected.data)
          done()
        })
    })
  })

  context('SHOW\tGET\taccount/:id', () => {
    it('should list one account', (done) => {
      chai.request(server)
        .get('/account/1')
        .end((err, res) => {
          const expected = { status: 200, data: data[0] }
          const { status, body } = res
          status.should.equal(expected.status)
          body.data.should.deep.equal(expected.data)
          done()
        })
    })

    it('should return an error if an incorrect id is provided', (done) => {
      chai.request(server)
        .get('/account/123')
        .end((err, res) => {
          const expected = { status: 404 }
          const { status, body } = res

          body.error.status.should.equal(expected.status)
          body.error.should.be.an('object')
          body.error.should.have.property('message')
          done()
        })
    })
  })
})