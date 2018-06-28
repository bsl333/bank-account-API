const uuid = require('uuid')
const bankData = require('../data/data')

const getAllAccts = (limit) => {
  return limit ? bankData.slice(0, limit) : bankData
}

const getOneAcct = (id) => {
  const errors = []
  const account = bankData.find(acct => acct.id === id)
  let response
  if (!account) {
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
  if (!description) {
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

const getAllTransactions = (id, limit) => {
  const errors = []
  const acct = bankData.find(acct => acct.id === id)
  let response
  if (acct) {
    response = limit ?
      acct.transactions.slice(0, limit) : acct.transactions
  } else {
    errors.push(`Account with ${id} not found`)
    response = errors
  }
  return response
}

const getOneTransaction = (id, txId) => {
  const errors = []
  const acct = bankData.find(acct => acct.id === id)
  let response
  if (acct) {
    const { transactions } = acct
    const transaction = transactions.find(transaction => transaction.id === txId)
    if (transaction) {
      response = transaction
    } else {
      errors.push(`Account with id ${id} does not have a transaction with id ${txId}`)
    }
  } else {
    errors.push(`Account with ${id} not found`)
  }
  response = errors.length ? { errors } : response
  return response
}

const createTransaction = (id, { title, amount, pending = "true" }) => {
  const errors = []
  const acct = bankData.find(acct => acct.id === id)
  let response
  if (acct) {
    if (!title || title.length > 8) {
      errors.push(`Missing title field in body of request OR length of title field less than 9 characters`)
    }
    if (!amount) {
      errors.push(`Missing amount field in body of request`)
    }
    if (!errors.length) {
      const { transactions } = acct
      const transaction = {
        id: uuid(),
        title,
        amount,
        pending
      }
      response = transaction
      transactions.push(transaction)
    }
  } else {
    errors.push(`Account with ${id} not found`)
  }
  response = errors.length ? { errors } : response
  return response
}

const updateTransaction = (id, txId, { title, amount, pending }) => {
  const errors = []
  const acct = bankData.find(acct => acct.id === id)
  let response
  if (acct) {
    if (!title && !amount && !(pending.toString())) {
      errors.push(`Invalid Request: must have at least one of the following properties in the body of request: title, amount, or pending`)
    }
    if (title.length > 8) {
      errors.push(`Invalid Request: title field must be less than 9 characters`)
    }
    if (!errors.length) {
      const { transactions } = acct
      const transaction = transactions.find(transaction => transaction.id === txId)
      transaction.title = title || transaction.title
      transaction.amount = amount || transaction.amount
      transaction.pending = pending || transaction.pending
      response = transaction
    }
  } else {
    errors.push(`Account with ${id} not found`)
  }

  response = errors.length ? { errors } : response
  return response
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