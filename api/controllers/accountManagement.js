const mongoose = require('mongoose');
const account = require('../models/Account.model');
const Role = require('../models/Role.model');
const httpError = require('http-errors');

const listAccount = async (req, res, next) => {
    try {
        const accounts = await account.find().populate("roles", "name");
        res.status(200).json({
            message: 'List of accounts',
            accounts: accounts.map(acc => ({
                _id: acc._id,
                email: acc.email,
                phone: acc.phone,
                username: acc.userName,
                avatar: acc.avatar,
                roles: acc.roles.map(role => role.name)
            }))
        });
    } catch (error) {
        next(httpError(500, 'Failed to fetch accounts'));
    }
};

const updateAccount = async (req, res, next) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid account ID' });
    }
    console.log(`Updating account with ID: ${id}`);
    const { email, phone, username, avatar, roles } = req.body;
  
    try {
      let roleIds = [];
      if (roles && roles.length > 0) {
        const roleDocs = await Role.find({ name: { $in: roles } });
        roleIds = roleDocs.map(role => role._id);
      }
  
      const updateData = {
        email,
        phone,
        userName: username,
        avatar,
      };
  
      if (roleIds.length > 0) {
        updateData.roles = roleIds;
      }
  
      const updatedAccount = await account.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      ).populate("roles", "name");
  
      if (!updatedAccount) {
        console.error(`Account with ID ${id} not found`);
        return next(httpError(404, 'Account not found'));
      }
  
      console.log(`Account with ID ${id} updated successfully`);
  
      res.status(200).json({
        message: 'Account updated successfully',
        account: {
          _id: updatedAccount._id,
          email: updatedAccount.email,
          phone: updatedAccount.phone,
          username: updatedAccount.userName,
          avatar: updatedAccount.avatar,
          roles: updatedAccount.roles.map(role => role.name)
        }
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        console.error('Validation Errors:', error.errors);
        const errors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ message: 'Validation Error', errors });
      }
      console.error('Error while updating account:', error);
      next(httpError(500, 'Failed to update account'));
    }
  };
  

const addAccount = async (req, res, next) => {
    const { email, phone, username, password, avatar, roles } = req.body;
    console.log(req.body);
    

    try {
        let roleIds = [];
        if (roles && roles.length > 0) {
            const roleDocs = await Role.find({ name: { $in: roles } });
            roleIds = roleDocs.map(role => role._id);
        }

        const newAccount = new account({
            email,
            phone,
            userName: username,
            password,
            avatar,
            roles: roleIds
        });

        await newAccount.save();

        res.status(201).json({
            message: 'Account created successfully',
            account: {
                email: newAccount.email,
                phone: newAccount.phone,
                username: newAccount.userName,
                avatar: newAccount.avatar,
                roles: roleIds
            }
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            console.error('Validation Errors:', error.errors);
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Validation Error', errors });
        }
        console.error('Error while creating account:', error);  
        next(httpError(500, 'Failed to create account'));
    }
      
}

const deleteAccount = async (req, res, next) => {
    try {
        const accId = req.params.id
        console.log(accId);
        
        let result = await account.deleteById({ _id: accId })
        res.status(200).json(result)
    } catch (error) {
        if (error.name === 'ValidationError') {
            console.error('Validation Errors:', error.errors);
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Validation Error', errors });
        }
        console.error('Error while creating account:', error);  
        next(httpError(500, 'Failed to create account'));
    }

}

module.exports = { listAccount, updateAccount, addAccount, deleteAccount };