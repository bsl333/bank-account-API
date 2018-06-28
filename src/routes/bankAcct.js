const router = require('express').Router()

const ctrl = require('../controller/bankAcct')

/****           ACCOUNT ONLY ROUTES        ****/
router.get('/', ctrl.getAllAccts)
router.get('/:id', ctrl.getOneAcct)
router.post('/', ctrl.createAcct)
router.put('/:id', ctrl.updateAcct)
router.delete('/:id', ctrl.destroyAcct)

/****           TRANSACTION ONLY ROUTES   ****/

router.get('/:id/transactions', ctrl.getAllTransactions)
router.get('/:id/transactions/:txId', ctrl.getOneTransaction)
router.post('/:id/transactions', ctrl.createTransaction)
router.put('/:id/transactions/:txId', ctrl.updateTransaction)
router.delete('/:id/transactions/:txId', ctrl.deleteTransaction)



module.exports = router
