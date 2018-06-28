const model = require('../model/bankAcct')

const getAllAccts = (req, res, next) => {
  const limit = req.query.limit
  const result = model.getAllAccts(limit)
  res.json({ data: result })
}

const getOneAcct = (req, res, next) => {
  const id = req.params.id
  const result = model.getOneAcct(id)

  if (result.errors) {
    next({ status: 404, message: result.errors.join('; ') })
  } else {
    res.json({ data: result })
  }
}

const createAcct = (req, res, next) => {
  const result = model.createAcct(req.body)

  if (result.errors) {
    next({ status: 404, message: result.errors.join('; ') })
  } else {
    res.json({ data: result })
  }
}

const updateAcct = (req, res, next) => {
  const id = req.params.id
  const result = model.updateAcct(id, req.body)
  if (result.errors) {
    next({ status: 404, message: result.errors.join('; ') })
  } else {
    res.json({ data: result })
  }
}

const destroyAcct = (req, res, next) => {
  const id = req.params.id
  const result = model.destroyAcct(id)

  if (result.errors) {
    next({ status: 404, message: result.errors.join('; ') })
  } else {
    res.status(204).json({ data: result })
  }
}

const getAllTransactions = (req, res, next) => {
  const limit = req.query.limit
  const id = req.params.id
  const result = model.getAllTransactions(id, limit)

  if (result.errors) {
    next({ status: 404, message: result.errors.join('; ') })
  } else {
    res.json({ data: result })
  }
}

const getOneTransaction = (req, res, next) => {
  const { id, txId } = req.params
  console.log(id, txId)
  const result = model.getOneTransaction(id, txId)

  if (result.errors) {
    next({ status: 404, message: result.errors.join('; ') })
  } else {
    res.json({ data: result })
  }
}

const createTransaction = (req, res, next) => {
  const id = req.params.id
  const result = model.createTransaction(id, req.body)

  if (result.errors) {
    next({ status: 404, message: result.errors.join('; ') })
  } else {
    res.status(201).json({ data: result })
  }
}

const updateTransaction = (req, res, next) => {
  const { id, txId } = req.params
  const result = model.updateTransaction(id, txId, req.body)

  if (result.errors) { 
    next({ status: 404, message: result.errors.join('; ') })
  } else {
    res.json({ data: result })
  }
}

module.exports = {
  getAllAccts,
  getOneAcct,
  createAcct,
  updateAcct,
  destroyAcct,
  getAllTransactions,
  getOneTransaction,
  createTransaction,
  updateTransaction
} 