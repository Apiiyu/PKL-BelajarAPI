const ProductModel = require('./Product')
const UsersModel = require('./Users')
const TransactionModel = require('./Transaction')
const DetailProductModel = require('./DetailProduct')

const model = {
  Product: ProductModel,
  Users: UsersModel,
  Transaction: TransactionModel,
  DetailProduct: DetailProductModel
}

module.exports = model
