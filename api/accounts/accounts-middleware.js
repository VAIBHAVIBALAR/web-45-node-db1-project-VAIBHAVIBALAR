const Account = require('./accounts-model')

const db = require('../../data/db-config')

exports.checkAccountPayload = async (req, res, next) => {
  const {name, budget} = await req.body
  if(name === undefined || budget === undefined){
    next({status:400, message: 'name and budget are required'})
  } else if (typeof name !== 'string'){
    next({status:400, message: 'name of account must be a string'})
  } else if (name.trim().length < 3 || name.trim().length > 100){
    next({ status:400, message: 'name of account must be between 3 and 100'})
  } else if (typeof budget !== 'number' || isNaN(budget)){
    next({ status:400, message: 'budget of account must be a number'})
  } else if (budget < 0 || budget > 1000000){
    next({ status:400, message: 'budget of account is too large or too small'})
  } else {
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const already = await db('accounts').where('name', req.body.name.trim()).first()
    if (already){
        next({ status: 400, message: 'that name is taken'})
    } else {
      next()
    }
  } catch (err){
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id)
    if (!account){
      next({ status:404, message: 'account not found'})
    } else {
      req.account = account
      next()
    }
  }catch(err){
  next(err)
   
  }
}
