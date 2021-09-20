'use strict'

const Model = require('../config/model/Index')
const { Op } = require('sequelize')
const dataTransaction = require('../config/model/Transaction')
const controller = {}

// <-- Controller All Menu -->

controller.getAllDataMenu = async (req, res) => {
  req.headers.authorization = 'Basic ' + Buffer.from('admin:admin').toString('base64')
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
  try {
    if (req.headers.authorization) {
      const dataOrders = req.body.orders
      const dataQty = req.body.qty
      const TAX = 0.10
      const dataMenuUser = JSON.stringify(dataOrders)
      const qtyMenuUser = JSON.stringify(dataQty)
      const dataPriceMenu = []
      const totalPricePerMenu = []

      if (dataOrders.length > 1 && dataQty.length > 1) {
        let finalPriceMenu = 0
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
                dataPriceMenu.push(price)
                totalPricePerMenu.push(PriceMenu)
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
              } else {
                res.status(400).json({
                  status: 400,
                  message: 'Menu, not found!'
                })
                return false
              }
            })
        }

        const dataTotalPriceMenu = JSON.stringify(totalPricePerMenu)
        const totalTAX = finalPriceMenu * TAX
        const finalPrice = finalPriceMenu + totalTAX
        const dataPricePerMenu = JSON.stringify(dataPriceMenu)
        // const finalPrice = finalPriceMenu + totalTAX
        // // <-- Insert Data Transaction to database -->
        Model.Transaction.create({
          nameUser: req.body.nameUser,
          orders: dataMenuUser,
          qty: qtyMenuUser,
          price: dataPricePerMenu,
          totalPrice: finalPriceMenu,
          TAX: totalTAX,
          totalPay: finalPrice,
          date: Date.now()
        })

        // // <-- Get Transaction ID -->
        Model.Transaction.findAll({ where: { nameUser: req.body.nameUser } })
          .then((response) => {
            if (response.length < 1) {
              console.log('Data Tidak tersedia')
              return false
            } else {
              return true
            }
          })

        Model.Transaction.findAll({
          where: {
            date: {
              [Op.gte]: [
                { date: Date.now() }
              ]
            },
            nameUser: req.body.nameUser,
            orders: dataMenuUser
          }
        })
          .then((dataTransaction) => {
            if (dataTransaction < 1) {
              const transactionID = 'Error Transaction ID'
              res.status(500).json({
                status: 500,
                transactionID,
                message: 'Error from server'
              })
              return false
            } else {
              const setDataTransaction = dataTransaction[0]
              // console.log(setDataTransaction)
              const Transaction = setDataTransaction.dataValues
              const transactionID = Transaction.transactionID
              // console.log(transactionID)
              res.status(200).json({
                status: 200,
                transactionID,
                message: `Successfully received your order. You have to pay a price of Rp. ${finalPrice} of to process your order`
              })
            }
          })
      } else {
        const qtyOrder = req.body.qty
        let totalPay = 0
        const TAX = 0.10
        await Model.Product.findAll({ where: { nama: req.body.orders } })
          .then((result) => {
            if (result.length > 0) {
              const setData = result[0]
              const data = setData.dataValues
              const qtyDefault = data.qty
              const newQty = qtyDefault - qtyOrder
              const defaultPrice = data.price
              const newPrice = defaultPrice * qtyOrder
              const priceTAX = newPrice * TAX
              const finalPrice = newPrice + priceTAX
              totalPay += finalPrice

              if (newQty < 0) {
                res.status(200).json({
                  status: 200,
                  message: 'Sorry, the menu you ordered is only available in a few. Please choose another menu again'
                })
                return false
              }

              Model.Product.update({ qty: newQty }, { where: { nama: req.body.orders } })
              // <-- Insert Data Transaction to database -->
              Model.Transaction.create({
                nameUser: req.body.nameUser,
                orders: req.body.orders,
                qty: newQty,
                price: defaultPrice,
                totalPrice: newPrice,
                TAX: priceTAX,
                totalPay: finalPrice,
                date: Date.now()
              })

              // <-- Get Transaction ID -->
            } else {
              res.status(400).json({
                status: 400,
                message: 'Menu, not found!'
              })
            }
          })

        const filterProduct = await Model.Transaction.findAll({ where: { nameUser: req.body.nameUser } })
        console.log(filterProduct)
        if (filterProduct.length > 0) {
          await Model.Transaction.findAll({
            where: {
              nameUser: req.body.nameUser,
              orders: req.body.orders,
              totalPay: totalPay
            }
          })
            .then((dataTransactionUser) => {
              if (dataTransactionUser.length > 0) {
                const setDataTrans = dataTransactionUser[0]
                const dataTransaction = setDataTrans.dataValues
                const transactionID = dataTransaction.transactionID
                res.status(200).json({
                  status: 200,
                  transactionID: transactionID,
                  message: `Successfully received your order. You have to pay a price of Rp. ${totalPay} of to process your order`
                })
              } else {
                res.status(500).json({
                  status: 500,
                  transactionID: 'Error Transaction ID',
                  message: 'Error From Server'
                })
                return false
              }
            })
        } else {
          res.status(400).json({
            status: 400,
            data: [],
            message: 'Data Transaction not Found'
          })
        }
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
