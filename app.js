const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.json({
    message: 'testing'
  })
})

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000')
})
