const express = require('express');
const app = express();
require('dotenv').config(); 
const transactionsController = require('./controllers/transactionsController')
const TransactionsMiddleware = require('./midllewares/transactionsMiddleware') 
app.use(express.json());

app.listen(process.env.CONNECTION_PORT , function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", process.env.CONNECTION_PORT );
});

app.get('/transactions', transactionsController.getAll);
app.post('/transactions', TransactionsMiddleware.validateCreateBody, transactionsController.createTransaction);
app.get('/balance/:year/:month', transactionsController.calculateMonthBalance);
app.delete('/transactions/:id', transactionsController.deleteTransaction);