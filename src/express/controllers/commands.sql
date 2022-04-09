CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
)

CREATE TABLE contracts(
    contract_id SERIAL PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
)

INSERT INTO users ( email, name, password)
VALUES('yankun@gmail.com', 'Yankun', '1234')

INSERT INTO contracts ( content, token, user_id)
VALUES('', '0000', 1),