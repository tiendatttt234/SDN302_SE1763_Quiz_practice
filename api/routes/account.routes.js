
const express = require('express');

const { listAccount, updateAccount } = require('../controllers/accountManagement');

const accountRouter = express.Router();


accountRouter.get('/list', listAccount);
accountRouter.put('/update/:id', updateAccount);


module.exports = accountRouter;
