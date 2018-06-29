# bank-account-API

### What it is

Simple RESTFul API that levarages an MVC architecture. The API can perform the following request.

##### Accessing account data
* GET all accounts: `domain/account`
* GET a single instance of an account: `domain/account/{account_id}`
* POST a new account: `domain/account`; req.body must contain name, bankName, and description
* PUT new information into an existing account: `domain/account`; req.body must contain either name, bankName or description
* DELETE an existing account `domain/account/{account_id}`

##### Accessing transaction data within an account
* GET all transactions for an account: `domain/account/{account_id}/transactions`
* GET a transactions for an account: `domain/account/{account_id}/transactions/{transaction_id}`
* POST a new transaction to an account: `domain/account/{account_id}/transactions/`; body must contain a title and amount property
* PUT new transaction info to an transaction: `domain/account/{account_id}/transactions/{transaction_id}`; body must contain a title, amount, or pending property
* DELETE an existing transaction from an account: `domain/account/{account_id}/transactions/{transaction_id}`

The bank account is an array of individual accounts. An individual account has the following properties
```
{
  id: "1",
  name: "Branden",
  bankName: "Wells Fargo",
  description: "Checking Account",
  transactions: [{
    id: "a",
    title: "Amazon",
    amount: 100,
    pending: false
  }, {
    id: "b",
    title: "CVS",
    amount: 10,
    pending: true
  }]
}
```
