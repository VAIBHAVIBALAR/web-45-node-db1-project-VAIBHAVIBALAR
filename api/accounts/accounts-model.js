const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts');
}

const getById = id => {
  return db('accounts').where('id', id).first();
}

const create = async account => {
  const [id] = await db('accounts').insert(account)
  return getById(id)
  
}

const updateById = async (id, account) => {
  console.log(account)
  return await db('accounts').where('id', id).update(account)
}

const deleteById = async (id) => {
 return await db('accounts').where('id', id).delete()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
