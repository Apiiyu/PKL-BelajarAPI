const Sequelize = require('sequelize')
const database = require('../database/db')

const dataTransaction = database.define('transaction', {
  transactionID: { type: Sequelize.INTEGER, primaryKey: true },
  nameUser: Sequelize.STRING,
  orders: Sequelize.STRING,
  qty: Sequelize.INTEGER,
  price: Sequelize.INTEGER,
  totalPrice: Sequelize.INTEGER,
  TAX: Sequelize.INTEGER,
  totalPay: Sequelize.INTEGER,
  date: Sequelize.DATE
}, {
  freezeTableName: true,
  timestamps: false
})

dataTransaction.removeAttribute('id')

module.exports = dataTransaction
