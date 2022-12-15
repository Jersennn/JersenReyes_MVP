DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id SERIAL,
    username TEXT,
    weight INTEGER
);



INSERT INTO users(username, weight)VALUES('Jersen', 170);
INSERT INTO users(username, weight)VALUES('Andy', 164);
INSERT INTO users(username, weight)VALUES('Jerome', 186);
INSERT INTO users(username, weight)VALUES('Ben', 151);