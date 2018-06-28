const uuid = require('uuid')
const bankData = require('../data/data')

const getAll = (limit) => {
  return limit ? bankData.slice(0, limit) : bankData
}

const getOneAcct = (id) => {
  const errors = []
  const account = bankData.find(acct => acct.id === id)
  let response
  if(!account) {
    errors.push(`Account with id ${id} not found`)
    response = { errors }
  } else {
    response = account
  }
  return response
}

const createAcct = ({ name, bankName, description, transactions }) => {
  // console.log(arguments)
  const errors = []
  let response
  if (!name) {
    errors.push(`Missing name field in request of body`)
  } 
  if (!bankName) {
    errors.push(`Missing bankName field in request of body`)
  }
  if(!description) {
    errors.push(`Missing description field in request of body`)
  }
  if (!errors.length) {
    transactions = transactions ? transactions : []
    const newAcct = {
      id: uuid(),
      name,
      bankName,
      description,
      transactions 
    }
    bankData.push(newAcct)
    response = newAcct
  }
  response = errors.length ? { errors } : response
  return response

}

const updateAcct = (id, { name, bankName, description }) => {
  const errors = []
  const acct = bankData.find(acct => acct.id === id)
  if (acct) {
    if (name || bankName || description) {
      acct.name = name || acct.name
      acct.bankName = bankName || acct.bankName
      acct.description = description || acct.description
    } else {
      errors.push(`Invalid request: either name, bankName or description must be in body of request to update an existing account`)
    }
  } else {
    errors.push(`Account with id ${id} not found`)
  }
  let response = errors.length ? { errors } : acct
  return response
}

const destroyAcct = (id) => {
  const errors = []
  const acctIdx = bankData.findIndex(acct => acct.id === id)
  console.log(acctIdx)
  if (acctIdx > -1) {
    bankData.splice(acctIdx, 1)
  } else {
    errors.push(`Account with ${id} not found`)
  }
  return errors.length ? { errors } : {}
}

module.exports = {
  getAll,
  getOneAcct,
  createAcct,
  updateAcct,
  destroyAcct
}