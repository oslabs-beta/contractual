CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
)

CREATE TABLE contracts(
    contract_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
)

CREATE TABLE users_contracts(
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    contract_id INTEGER,
    FOREIGN KEY (contract_id) REFERENCES contracts(contract_id),
    premission BOOLEAN
)


-- Insert dummy data
INSERT INTO users ( email, name, password)
VALUES('yankun@gmail.com', 'Yankun', '1234')

INSERT INTO contracts ( title, content, token, user_id)
VALUES('Contractual', '{username: "string", age: "number"}' , 'A1B2', 1)

INSERT INTO contracts ( title, content, token, user_id)
VALUES('Habitual', '{calendar: "array"}' , 'XY69', 1)

INSERT INTO users_contracts (user_id, contract_id, premission)
VALUES(1,1, true)


-- Re-serialize primary key
ALTER SEQUENCE contracts_contract_id_seq RESTART WITH 1
ALTER SEQUENCE users_user_id_seq RESTART WITH 1

-- Delete table content with foreign key
TRUNCATE TABLE users
CASCADE;

TRUNCATE TABLE contracts

-- Add column to table
ALTER TABLE contracts
ADD COLUMN title VARCHAR(255) NOT NULL