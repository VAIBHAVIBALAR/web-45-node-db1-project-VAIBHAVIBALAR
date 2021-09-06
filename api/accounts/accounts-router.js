const router = require('express').Router()
const Account = require('./accounts-model')
const mD = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
 try {
   const accounts = await Account.getAll()
   res.json(accounts)
 } catch(err){
   next(err)
 }
})

router.get('/:id',mD.checkAccountId, async (req, res, next) => {
  res.json(req.account)
})

router.post('/', mD.checkAccountPayload,
 mD.checkAccountNameUnique, (req, res, next) => {
  try {
    res.json('create account')
  } catch(err){
    next(err)
  }
})

router.put('/:id', mD.checkAccountId, (req, res, next) => {
  try {
    res.json('update account')
  } catch(err){
    next(err)
  }
});

router.delete('/:id', mD.checkAccountId, (req, res, next) => {
  try {
    res.json('delete account')
  } catch(err){
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
 res.status(err.status || 500).json({
   message: err.message,
 })
})

module.exports = router;
