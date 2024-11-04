
const express = require('express');

const { listAccount, updateAccount, addAccount, deleteAccount } = require('../controllers/accountManagement');

const accountRouter = express.Router();


accountRouter.get('/list', listAccount);
accountRouter.put('/update/:id', updateAccount);
accountRouter.post('/add', addAccount );
accountRouter.delete('/delete/:id', deleteAccount)


module.exports = accountRouter;
 