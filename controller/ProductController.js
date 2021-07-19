const Model = require('../config/model/Index')
const controller = {}

controller.getAllData = async (req, res) => {
  try {
    await Model.Product.findAll()
      .then((result) => {
        if (result.length > 0) {
          res.status(200).json({
            status: 200,
            message: 'Successfully get all data product!',
            data: result
          })
        } else {
          res.status(200).json({
            status: 200,
            message: 'Data not found',
            data: []
          })
        }
      })
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error
    })
  }
}

module.exports = controller
