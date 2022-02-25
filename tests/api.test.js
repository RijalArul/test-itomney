const app = require('../app')
const request = require('supertest')

describe('POST / adding new products', (req, res) => {
  const payload = {
    id: 1,
    name: 'Test'
  }
  test('201 Success create products - should create new Product', done => {
    request(app)
      .post('/')
      .send(payload)
      .then(response => {
        const { body, status } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('name', expect.any(String))
        done()
      })
  })
})

describe('GET / Get All Products with sorting', (req, res) => {
  test('200 Get All Products - should showed all products', done => {
    request(app)
      .get('/')
      .then(response => {
        const { body, status } = response
        expect(status).toBe(200)
        expect(Array.isArray(body))
        expect(body).toHaveProperty('status', expect.any(Boolean))
        done()
      })
  })
})
