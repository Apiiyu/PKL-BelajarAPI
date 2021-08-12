const Sequelize = require('sequelize')
const database = require('../database/db')

const dataDetailProduct = database.define('detail_product', {
  idDetailProduct: { type: Sequelize.INTEGER, primaryKey: true },
  itemCode: Sequelize.STRING,
  detail: Sequelize.STRING,
  foodMaker: Sequelize.STRING
}, {
  freezeTableName: true,
  timestamps: false
})

dataDetailProduct.removeAttribute('id')

module.exports = dataDetailProduct
