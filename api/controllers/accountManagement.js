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
    const { email, phone, username, avatar, roles } = req.body;
    try {
        let roleIds = [];
        if (roles && roles.length > 0) {
            const roleDocs = await Role.find({ name: { $in: roles } });
            roleIds = roleDocs.map(role => role._id);
        }
        const updatedAccount = await account.findByIdAndUpdate(
            id,
            {
                email,
                phone,
                userName: username,
                avatar,
                roles: roleIds
            },
            { new: true }
        ).populate("roles", "name");

        if (!updatedAccount) {
            return next(httpError(404, 'Account not found'));
        }
        res.status(200).json({
            message: 'Account updated successfully',
            account: {
                email: updatedAccount.email,
                phone: updatedAccount.phone,
                username: updatedAccount.userName,
                avatar: updatedAccount.avatar,
                roles: updatedAccount.roles.map(role => role.name)
            }
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Validation Error', errors });
        }
        next(httpError(500, 'Failed to update account'));
    }
};

const addAccount = async (req, res, next) => {
    const { email, phone, username, password, avatar, roles } = req.body;

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
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Validation Error', errors });
        }
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
        next(httpError(500, 'Failed to delete account'));
    } 

}

module.exports = { listAccount, updateAccount, addAccount, deleteAccount };