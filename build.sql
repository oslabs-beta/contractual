CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    name VARCHAR NOT NULL,
    password VARCHAR NOT NULL
)

CREATE TABLE contracts(
    contract_id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    content VARCHAR NOT NULL,
    token VARCHAR NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
)

CREATE TABLE users_contracts(
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    contract_id INTEGER,
    FOREIGN KEY (contract_id) REFERENCES contracts(contract_id),
    permission BOOLEAN
)