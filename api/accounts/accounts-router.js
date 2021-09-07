const router = require('express').Router()
const Account = require('./accounts-model')
const {checkAccountId, checkAccountPayload, checkAccountNameUnique} = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
 try {
   const accounts = await Account.getAll()
   res.json(accounts)
 } catch(err){
   next(err)
 }
})

router.get('/:id', checkAccountId, async (req, res) => {
  res.json(req.account)
})


router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const trimmedName = req.body.name.trim()
    const newAcc = await Account.create({...req.body, name: trimmedName })
    res.status(201).json(newAcc)
  } catch(err){
    next(err)
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  try {
    const trimmedName = req.body.name.trim()
    const { id } = req.params
    const updatedAccountId = await Account.updateById(id,{...req.body, name: trimmedName})
    const updatedAccount = await Account.getById(updatedAccountId)
    res.status(200).json(updatedAccount)
  } catch(err){
    next(err)
  }
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  try {
    const { id } = req.params 
    Account.deleteById(id)
    res.json('account deleted')
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
