
const express = require('express');

const { listAccount, updateAccount, addAccount } = require('../controllers/accountManagement');

const accountRouter = express.Router();


accountRouter.get('/list', listAccount);
accountRouter.put('/update/:id', updateAccount);
accountRouter.post('/add', addAccount );


module.exports = accountRouter;
