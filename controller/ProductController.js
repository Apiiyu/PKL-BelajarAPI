'use strict'

const Model = require('../config/model/Index')
const { Op } = require('sequelize')
const controller = {}

// <-- Controller All Menu -->

controller.getAllDataMenu = async (req, res) => {
  try {
    await Model.Product.findAll()
      .then((result) => {
        if (result.length > 0) {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully get all data product!',
              data: result
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
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

controller.searchMenu = async (req, res) => {
  try {
    await Model.Product.findAll({
      where: {
        [Op.or]: [{
          itemCode: {
            [Op.like]: `%${req.params.keyword}%`
          }
        }, {
          nama: {
            [Op.like]: `%${req.params.keyword}%`
          }
        }]
      }
    })
      .then((result) => {
        if (result.length > 0) {
          res.status(200).json({
            status: 200,
            message: 'Successfully search menu!',
            data: result
          })
        } else {
          res.status(404).json({
            status: 404,
            message: 'Menu not found!',
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

controller.createMenu = async (req, res) => {
  try {
    await Model.Product.create({
      itemCode: req.body.itemCode,
      nama: req.body.nama,
      category: req.body.category,
      qty: req.body.qty,
      price: req.body.price,
      image: req.file.path
    })
      .then((result) => {
        if (req.headers.authorization) {
          res.status(200).json({
            status: 200,
            message: 'Successfully create new product!',
            data: result
          })
        } else {
          res.status(401).json({
            status: 401,
            message: 'Unauthorized'
          })
        }
      })
  } catch (error) {
    console.log(error)
  }
}

controller.updateMenu = async (req, res) => {
  try {
    if (req.body.nama || req.body.category || req.body.qty || req.body.price) {
      await Model.Product.update({ nama: req.body.nama, category: req.body.category, qty: req.body.qty, price: req.body.price }, { where: { itemCode: req.body.itemCode } })
        .then((result) => {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully update menu'
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        })
    } else if (req.body.nama || req.body.category || req.body.qty) {
      await Model.Product.update({ nama: req.body.nama, category: req.body.category, qty: req.body.qty },
        { where: { itemCode: req.body.itemCode } })
        .then((result) => {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully update menu'
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        })
    } else if (req.body.nama || req.body.category) {
      await Model.Product.update({ nama: req.body.nama, category: req.body.category },
        { where: { itemCode: req.body.itemCode } })
        .then((result) => {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully update menu'
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        })
    } else if (req.body.nama) {
      await Model.Product.update({ nama: req.body.nama }, { where: { itemCode: req.body.itemCode } })
        .then((result) => {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully update menu'
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        })
    } else if (req.body.category) {
      await Model.Product.update({ category: req.body.category }, { where: { itemCode: req.body.itemCode } })
        .then((result) => {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully update menu'
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        })
    } else if (req.body.qty) {
      await Model.Product.update({ qty: req.body.qty }, { where: { itemCode: req.body.itemCode } })
        .then((result) => {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully update menu'
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        })
    } else if (req.body.price) {
      await Model.Product.update({ price: req.body.price }, { where: { itemCode: req.body.itemCode } })
        .then((result) => {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully update menu'
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        })
    } else {
      res.status(400).json({
        status: 400,
        message: 'You should fill the field for update menu'
      })
    }
  } catch (error) {
    console.log(error)
  }
}

controller.deleteMenu = async (req, res) => {
  try {
    await Model.Product.destroy({ where: { itemCode: req.body.itemCode } })
      .then((result) => {
        if (req.headers.authorization) {
          res.status(200).json({
            status: 200,
            message: 'Successfully delete menu!'
          })
        } else {
          res.status(401).json({
            status: 401,
            message: 'Unauthorized'
          })
        }
      })
  } catch (error) {
    console.log(error)
  }
}

// <-- Controller detail menu -->
controller.detailMenu = async (req, res) => {
  try {
    await Model.DetailProduct.findAll({ where: { itemCode: req.params.itemCode } })
      .then((result) => {
        res.status(200).json({
          status: 200,
          message: 'Successfully get data detail product!',
          data: result
        })
      })
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error
    })
  }
}

controller.createDetailMenu = async (req, res) => {
  try {
    await Model.DetailProduct.create({
      itemCode: req.body.itemCode,
      detail: req.body.detail,
      foodMaker: req.body.foodMaker
    })
      .then((result) => {
        res.status(200).json({
          status: 200,
          message: 'Successfully create new detail menu!',
          data: result
        })
      })
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error
    })
  }
}

controller.updateDetailMenu = async (req, res) => {
  try {
    await Model.DetailProduct.update({
      detail: req.body.detail,
      foodMaker: req.body.foodMaker
    }, { where: { itemCode: req.body.itemCode } })
      .then((result) => {
        res.status(200).json({
          status: 200,
          message: 'Successfully update detail menu!',
          data: result
        })
      })
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error
    })
  }
}

controller.deleteDetailMenu = async (req, res) => {
  try {
    await Model.DetailProduct.destroy({ where: { itemCode: req.body.itemCode } })
      .then((result) => {
        res.status(200).json({
          status: 200,
          message: 'Successfully delete detail menu!'
        })
      })
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error
    })
  }
}

// <-- Controller Foods -->

controller.getAllDataFood = async (req, res) => {
  try {
    await Model.Product.findAll({ where: { category: 'Food' } })
      .then((result) => {
        if (result.length > 0) {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully get all data product!',
              data: result
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        } else {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Data not found',
              data: []
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        }
      })
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error
    })
  }
}

controller.createFood = async (req, res) => {
  try {
    await Model.Product.create({
      itemCode: req.body.itemCode,
      nama: req.body.nama,
      category: req.body.category,
      qty: req.body.qty,
      price: req.body.price,
      image: req.file.path
    })
      .then((result) => {
        if (req.headers.authorization) {
          res.status(200).json({
            status: 200,
            message: 'Successfully create new product!',
            data: result
          })
        } else {
          res.status(401).json({
            status: 401,
            message: 'Unauthorized'
          })
        }
      })
  } catch (error) {
    console.log(error)
  }
}

controller.updateFood = async (req, res) => {
  try {
    if (req.body.nama || req.body.category || req.body.qty || req.body.price) {
      await Model.Product.update({ nama: req.body.nama, category: req.body.category, qty: req.body.qty, price: req.body.price }, { where: { itemCode: req.body.itemCode } })
        .then((result) => {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully update food data'
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        })
    } else if (req.body.nama || req.body.category || req.body.qty) {
      await Model.Product.update({ nama: req.body.nama, category: req.body.category, qty: req.body.qty },
        { where: { itemCode: req.body.itemCode } })
        .then((result) => {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully update food data'
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        })
    } else if (req.body.nama || req.body.category) {
      await Model.Product.update({ nama: req.body.nama, category: req.body.category },
        { where: { itemCode: req.body.itemCode } })
        .then((result) => {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully update food data'
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        })
    } else if (req.body.nama) {
      await Model.Product.update({ nama: req.body.nama }, { where: { itemCode: req.body.itemCode } })
        .then((result) => {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully update food data'
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        })
    } else if (req.body.category) {
      await Model.Product.update({ category: req.body.category }, { where: { itemCode: req.body.itemCode } })
        .then((result) => {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully update food data'
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        })
    } else if (req.body.qty) {
      await Model.Product.update({ qty: req.body.qty }, { where: { itemCode: req.body.itemCode } })
        .then((result) => {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully update food data'
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        })
    } else if (req.body.price) {
      await Model.Product.update({ price: req.body.price }, { where: { itemCode: req.body.itemCode } })
        .then((result) => {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully update food data'
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        })
    } else {
      res.status(400).json({
        status: 400,
        message: 'You should fill the field for update food'
      })
    }
  } catch (error) {
    console.log(error)
  }
}

controller.deleteFood = async (req, res) => {
  try {
    await Model.Product.destroy({ where: { itemCode: req.body.itemCode } })
      .then((result) => {
        if (req.headers.authorization) {
          res.status(200).json({
            status: 200,
            message: 'Successfully delete menu!'
          })
        } else {
          res.status(401).json({
            status: 401,
            message: 'Unauthorized'
          })
        }
      })
  } catch (error) {
    console.log(error)
  }
}

// <-- Controller API Section Drink -->

controller.getAllDataDrink = async (req, res) => {
  try {
    await Model.Product.findAll({ where: { category: 'Drink' } })
      .then((result) => {
        if (result.length > 0) {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully get all data product!',
              data: result
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        } else {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Data not found',
              data: []
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        }
      })
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error
    })
  }
}

controller.createDrink = async (req, res) => {
  try {
    await Model.Product.create({
      itemCode: req.body.itemCode,
      nama: req.body.nama,
      category: req.body.category,
      qty: req.body.qty,
      price: req.body.price,
      image: req.file.path
    })
      .then((result) => {
        if (req.headers.authorization) {
          res.status(200).json({
            status: 200,
            message: 'Successfully create new product!',
            data: result
          })
        } else {
          res.status(401).json({
            status: 401,
            message: 'Unauthorized'
          })
        }
      })
  } catch (error) {
    console.log(error)
  }
}

controller.updateDrink = async (req, res) => {
  try {
    if (req.body.nama || req.body.category || req.body.qty || req.body.price) {
      await Model.Product.update({ nama: req.body.nama, category: req.body.category, qty: req.body.qty, price: req.body.price }, { where: { itemCode: req.body.itemCode } })
        .then((result) => {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully update drink data'
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        })
    } else if (req.body.nama || req.body.category || req.body.qty) {
      await Model.Product.update({ nama: req.body.nama, category: req.body.category, qty: req.body.qty },
        { where: { itemCode: req.body.itemCode } })
        .then((result) => {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully update drink data'
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        })
    } else if (req.body.nama || req.body.category) {
      await Model.Product.update({ nama: req.body.nama, category: req.body.category },
        { where: { itemCode: req.body.itemCode } })
        .then((result) => {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully update drink data'
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        })
    } else if (req.body.nama) {
      await Model.Product.update({ nama: req.body.nama }, { where: { itemCode: req.body.itemCode } })
        .then((result) => {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully update drink data'
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        })
    } else if (req.body.category) {
      await Model.Product.update({ category: req.body.category }, { where: { itemCode: req.body.itemCode } })
        .then((result) => {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully update drink data'
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        })
    } else if (req.body.qty) {
      await Model.Product.update({ qty: req.body.qty }, { where: { itemCode: req.body.itemCode } })
        .then((result) => {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully update drink data'
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        })
    } else if (req.body.price) {
      await Model.Product.update({ price: req.body.price }, { where: { itemCode: req.body.itemCode } })
        .then((result) => {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully update drink data'
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        })
    } else {
      res.status(400).json({
        status: 400,
        message: 'You should fill the field for update drink'
      })
    }
  } catch (error) {
    console.log(error)
  }
}

controller.deleteDrink = async (req, res) => {
  try {
    await Model.Product.destroy({ where: { itemCode: req.body.itemCode } })
      .then((result) => {
        if (req.headers.authorization) {
          res.status(200).json({
            status: 200,
            message: 'Successfully delete menu!'
          })
        } else {
          res.status(401).json({
            status: 401,
            message: 'Unauthorized'
          })
        }
      })
  } catch (error) {
    console.log(error)
  }
}

// <-- Controller section Snacks -->
controller.getAllDataSnacks = async (req, res) => {
  try {
    await Model.Product.findAll({ where: { category: 'Snack' } })
      .then((result) => {
        if (result.length > 0) {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully get all data product!',
              data: result
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        } else {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Data not found',
              data: []
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        }
      })
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error
    })
  }
}

controller.createSnack = async (req, res) => {
  try {
    await Model.Product.create({
      itemCode: req.body.itemCode,
      nama: req.body.nama,
      category: req.body.category,
      qty: req.body.qty,
      price: req.body.price,
      image: req.file.path
    })
      .then((result) => {
        if (req.headers.authorization) {
          res.status(200).json({
            status: 200,
            message: 'Successfully create new product!',
            data: result
          })
        } else {
          res.status(401).json({
            status: 401,
            message: 'Unauthorized'
          })
        }
      })
  } catch (error) {
    console.log(error)
  }
}

controller.updateSnack = async (req, res) => {
  try {
    if (req.body.nama || req.body.category || req.body.qty || req.body.price) {
      await Model.Product.update({ nama: req.body.nama, category: req.body.category, qty: req.body.qty, price: req.body.price }, { where: { itemCode: req.body.itemCode } })
        .then((result) => {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully update snack data'
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        })
    } else if (req.body.nama || req.body.category || req.body.qty) {
      await Model.Product.update({ nama: req.body.nama, category: req.body.category, qty: req.body.qty },
        { where: { itemCode: req.body.itemCode } })
        .then((result) => {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully update snack data'
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        })
    } else if (req.body.nama || req.body.category) {
      await Model.Product.update({ nama: req.body.nama, category: req.body.category },
        { where: { itemCode: req.body.itemCode } })
        .then((result) => {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully update snack data'
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        })
    } else if (req.body.nama) {
      await Model.Product.update({ nama: req.body.nama }, { where: { itemCode: req.body.itemCode } })
        .then((result) => {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully update snack data'
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        })
    } else if (req.body.category) {
      await Model.Product.update({ category: req.body.category }, { where: { itemCode: req.body.itemCode } })
        .then((result) => {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully update snack data'
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        })
    } else if (req.body.qty) {
      await Model.Product.update({ qty: req.body.qty }, { where: { itemCode: req.body.itemCode } })
        .then((result) => {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully update snack data'
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        })
    } else if (req.body.price) {
      await Model.Product.update({ price: req.body.price }, { where: { itemCode: req.body.itemCode } })
        .then((result) => {
          if (req.headers.authorization) {
            res.status(200).json({
              status: 200,
              message: 'Successfully update snack data'
            })
          } else {
            res.status(401).json({
              status: 401,
              message: 'Unauthorized'
            })
          }
        })
    } else {
      res.status(400).json({
        status: 400,
        message: 'You should fill the field for update snack'
      })
    }
  } catch (error) {
    console.log(error)
  }
}

controller.deleteSnack = async (req, res) => {
  try {
    await Model.Product.destroy({ where: { itemCode: req.body.itemCode } })
      .then((result) => {
        if (req.headers.authorization) {
          res.status(200).json({
            status: 200,
            message: 'Successfully delete menu!'
          })
        } else {
          res.status(401).json({
            status: 401,
            message: 'Unauthorized'
          })
        }
      })
  } catch (error) {
    console.log(error)
  }
}

// <-- Controller Orders -->
controller.orders = async (req, res) => {
  // console.log(req.body.orders)
  try {
    if (req.headers.authorization) {
      const dataOrders = req.body.orders
      const dataQty = req.body.qty
      // const reducer = (accumulator, currentValue) => accumulator + currentValue
      // console.log(dataQty.reduce(reducer))
      let finalPriceMenu = 0

      if (dataOrders.length > 1 && dataQty.length > 1) {
        for (let indexOrders = 0; indexOrders < dataOrders.length; indexOrders++) {
          await Model.Product.findAll({ where: { nama: dataOrders[indexOrders] } })
            .then((result) => {
              if (result.length > 0) {
                const setData = result[0]
                const dataMenu = setData.dataValues
                const qtyDefault = dataMenu.qty
                const finalQtyMenu = qtyDefault - dataQty[indexOrders]
                const price = dataMenu.price
                const PriceMenu = price * dataQty[indexOrders]
                finalPriceMenu += PriceMenu

                if (finalQtyMenu < 0) {
                  res.status(200).json({
                    status: 200,
                    message: 'Sorry, the menu you ordered is only available in a few. Please choose another menu again'
                  })
                  return false
                }

                // <-- Update data product without response -->
                Model.Product.update({ qty: finalQtyMenu }, { where: { nama: dataOrders[indexOrders] } })

                // <-- Insert Data Transaction to database -->
                Model.Transaction.create({
                  nameUser: req.body.nameUser,
                  orders: req.body.orders[indexOrders],
                  qty: req.body.qty[indexOrders],
                  price: price,
                  totalPrice: PriceMenu,
                  totalPay: finalPriceMenu,
                  date: Date.now()
                })
                  .then((result) => {
                    res.status(200).json({
                      status: 200,
                      message: `Successfully receive your orders. You should pay ${finalPriceMenu} for get your orders!`
                    })
                  })
              } else {
                res.status(400).json({
                  status: 400,
                  message: 'Menu, not found!'
                })
                return false
              }
            })
        } console.log(finalPriceMenu)
      } else {
        const qtyOrder = req.body.qty
        await Model.Product.findAll({ where: { nama: req.body.orders } })
          .then((result) => {
            if (result.length > 0) {
              const setData = result[0]
              const data = setData.dataValues
              const qtyDefault = data.qty
              const newQty = qtyDefault - qtyOrder
              const defaultPrice = data.price
              const newPrice = defaultPrice * qtyOrder

              if (newQty < 0) {
                res.status(200).json({
                  status: 200,
                  message: 'Sorry, the menu you ordered is only available in a few. Please choose another menu again'
                })
                return false
              }

              Model.Product.update({ qty: newQty }, { where: { nama: req.body.orders[0] } })
                .then((result) => {
                  res.status(200).json({
                    status: 200,
                    message: `Successfully received your order. You have to pay a price of Rp. ${newPrice} of to process your order`
                  })
                })

              // <-- Insert Data Transaction to database -->
              Model.Transaction.create({
                nameUser: req.body.nameUser,
                orders: req.body.orders,
                qty: req.body.qty,
                price: defaultPrice,
                totalPrice: newPrice,
                totalPay: newPrice,
                date: Date.now()
              })
            } else {
              res.status(400).json({
                status: 400,
                message: 'Menu, not found!'
              })
            }
          })
      }
    } else {
      res.status(401).json({
        status: 401,
        message: 'Unauthorized'
      })
    }
  } catch (error) {
    console.log(error)
  }
}

controller.getDataTransaction = async (req, res) => {
  try {
    await Model.Transaction.findAll({ where: { transactionID: req.params.transactionID } })
      .then((result) => {
        if (result.length > 0) {
          res.status(200).json({
            status: 200,
            message: 'Successfully get data transaction',
            transaction: result
          })
        } else {
          res.status(404).json({
            status: 404,
            message: 'Data transaction not found!'
          })
        }
      })
  } catch (error) {
    console.log(error)
  }
}

module.exports = controller
