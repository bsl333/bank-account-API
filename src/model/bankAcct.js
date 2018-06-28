const uuid = require('uuid')
const bankData = require('../data/data')

const getAll = (limit) => {
  return limit ? bankData.slice(0, limit) : bankData
}

module.exports = {
  getAll
}