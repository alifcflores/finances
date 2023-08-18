
CREATE TABLE transactions(
    id INT PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(100) NOT NULL,
    installments INT (2) NOT NULL,
    recipe_or_expense VARCHAR(15) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);


CREATE TABLE installments(
    id INT PRIMARY KEY AUTO_INCREMENT,
    transaction_id INT NOT NULL,
    FOREIGN KEY (transaction_id) REFERENCES transactions(id), 
    installment INT (2) NOT NULL,
    value INT NOT NULL,
    due_date DATE,
    payment_date DATE,
    status VARCHAR(45) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);