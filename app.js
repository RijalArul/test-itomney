const express = require('express')

const app = express()
const PORT = 3000
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

class Product {
  constructor (id, name) {
    this.id = id
    this.name = name
  }
}

let products = []
app.post('/', (req, res) => {
  const { name } = req.body
  let id = [1, 3, 5, 2, 6]
  let random_id = id[Math.floor(Math.random() * id.length)]

  const new_products = {
    id: random_id,
    name: name
  }
  products.push(new_products)
  res.status(201).json({
    id: new_products.id,
    name: new_products.name
  })
})

function sort (products) {
  for (let i = 0; i < products.length; i++) {
    for (let j = 0; j < products.length; j++) {
      // console.log(products[j + 1])
      if (products[j + 1] === undefined) {
        delete products[j + 1]
      } else {
        if (products[j].id > products[j + 1].id) {
          let prodj = products[j].id
          products[j].id = products[j + 1].id
          products[j + 1].id = prodj
        }
      }
    }
  }

  return products
}

app.get('/', (req, res) => {
  res.status(200).json({
    data: sort(products),
    status: true
  })
})

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})

module.exports = app
