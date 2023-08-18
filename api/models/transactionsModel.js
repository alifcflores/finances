const connection = require('./connection');
const moment = require('moment');

const getAll = async () =>{
    const [allTransactions] = await connection.execute('select * from transactions');    
    return allTransactions;
};


const createTransaction = async (transaction) =>{
    const {description, installments, recipe_or_expense} = transaction;
    const createATransaction = await connection.execute('INSERT INTO transactions(description, installments, recipe_or_expense, created_at, updated_at) VALUES (?, ?, ?, ?, ?)', [description, installments, recipe_or_expense, new Date(), new Date()]);
    createInstallments(transaction);  
    return createATransaction;
}


const createInstallments = async(transaction) => {
    const {description, value, first_due_date, status, installments, recipe_or_expense} = transaction;
    const [getLastTransaction] = await connection.execute('SELECT id FROM transactions WHERE description = ? AND installments = ? AND recipe_or_expense = ? order by created_at desc limit 1 ', [description, installments, recipe_or_expense]);   
    let dueDate;   
    for (let installment = 1; installment <= installments; installment++)  {
        first_due_date === undefined || first_due_date === '' || first_due_date === null ?  dueDate = null : dueDate = moment(first_due_date).add(installment - 1, 'month').format("YYYY-MM-DD");
        const query = 'INSERT INTO installments(transaction_id, installment, value, due_date, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
        await connection.execute(query, [getLastTransaction[0].id, installment, value,  dueDate, status, new Date(), new Date()]);
    }
}

const deleteTransaction = async (id) =>{
    const [deleted] = await connection.execute('DELETE FROM transactions WHERE id = ' + id);
    return deleted;
}

const calculateMonthBalance = async (year, month) =>{
    switch(month) {
        case 'january': month = '01'; break;
        case 'february': month = '02'; break;
        case 'march': month = '03'; break;
        case 'april': month = '04'; break;
        case 'may':  month = '05'; break;
        case 'june': month = '06'; break;
        case 'july': month = '07'; break;
        case 'august': month = '08'; break;
        case 'september': month = '09'; break;
        case 'october': month = '10'; break;
        case 'november': month = '11'; break;
        case 'december': month = '12'; break;
    }

    const query = "SELECT SUM (value) as value from installments "
    + "JOIN transactions on installments.transaction_id = transactions.id "
    + "WHERE due_date BETWEEN '" + year + "-" + month + "-01' AND '2023-" + month + "-31' "
    + "AND recipe_or_expense = ?";
    const [recipes] = await connection.execute(query, ['recipe']);
    const [expenses] = await connection.execute(query, ['expense']);
    return recipes[0].value - expenses[0].value;
};


module.exports = {
    getAll, createTransaction, calculateMonthBalance, deleteTransaction
};