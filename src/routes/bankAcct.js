const router = require('express').Router()

const ctrl = require('../controller/bankAcct')

router.get('/', ctrl.getAll)
router.get('/:id', ctrl.getOneAcct)
router.post('/', ctrl.createAcct)
router.put('/:id', ctrl.updateAcct)
router.delete('/:id', ctrl.destroyAcct)


module.exports = router
