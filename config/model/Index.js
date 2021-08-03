const ProductModel = require('./Product')
const UsersModel = require('./Users')
const TransactionModel = require('./Transaction')

const model = {
  Product: ProductModel,
  Users: UsersModel,
  Transaction: TransactionModel
}

module.exports = model
