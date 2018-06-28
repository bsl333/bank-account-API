const model = require('../model/bankAcct')

const getAll = (req, res, next) => {
  const limit = req.query.limit
  const result = model.getAll(limit)
  res.json({ data: result })
}

const getOneAcct = (req, res, next) => {
  const id = req.params.id
  const result = model.getOneAcct(id)

  if(result.errors) {
    next({ status: 404, message: result.errors.join('; ') })
  } else {
    res.json({ data: result })
  }
}

const createAcct = (req, res, next) => {
  const result = model.createAcct(req.body)

  if(result.errors) {
    next({ status: 404, message: result.errors.join('; ') })
  } else {
    res.json({ data: result })
  }
}

const updateAcct = (req, res, next) => {
  const id = req.params.id
  const result = model.updateAcct(id, req.body)
  if(result.errors) {
    next({ status: 404, message: result.errors.join('; ')})
  } else {
    res.json({ data: result })
  }
}

const destroyAcct = (req, res, next) => {
  const id = req.params.id
  const result = model.destroyAcct(id)

  if (result.errors) {
    next( {status: 404, message: result.errors.join('; ')})
  } else {
    res.status(204).json({ data: result })
  }
}
module.exports = {
  getAll,
  getOneAcct,
  createAcct,
  updateAcct,
  destroyAcct
} 