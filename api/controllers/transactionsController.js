const transactionsModel = require('../models/transactionsModel');

const getAll = async (_request, response) =>{
    const transactions = await transactionsModel.getAll();
    return response.status(200).json(transactions);
};

const createTransaction = async (request, response) =>{
    const createdTransaction = await transactionsModel.createTransaction(request.body);
    return response.status(201).json(createdTransaction);
}

const deleteTransaction = async (request, response) =>{
    const {id} = request.params;
    await transactionsModel.deleteTransaction(id)
    return response.status(201).json({'transaction deleted with sucess': id});
}

const calculateMonthBalance = async (request, response) =>{
    const {year, month} = request.params;
    const balance = await transactionsModel.calculateMonthBalance(year, month);
    return response.status(200).json(balance);
}

module.exports = {
    getAll, createTransaction, calculateMonthBalance, deleteTransaction
}; 