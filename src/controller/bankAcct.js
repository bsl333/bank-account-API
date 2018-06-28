const model = require('../model/bankAcct')

const getAll = (req, res, next) => {
  const limit = req.query.limit
  const result = model.getAll(limit)
  res.json(result)
}

module.exports = {
  getAll
}