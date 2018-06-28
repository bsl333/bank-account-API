const router = require('express').Router()

const ctrl = require('../controller/bankAcct')

router.get('/', ctrl.getAll)


module.exports = router
