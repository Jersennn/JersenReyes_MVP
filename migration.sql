DROP TABLE IF EXISTS saiyan;

CREATE TABLE saiyan (
    id SERIAL,
    username TEXT,
    power_level INTEGER
);



INSERT INTO saiyan(username, power_level)VALUES('Goku', 10000);
INSERT INTO saiyan(username, power_level)VALUES('Vegeta', 9999);
INSERT INTO saiyan(username, power_level)VALUES('Beerus', 20000);
INSERT INTO saiyan(username, power_level)VALUES('Omni-King', 999999999);
INSERT INTO saiyan(username, power_level)VALUES('Gohan', 9000);
INSERT INTO saiyan(username, power_level)VALUES('Trunks', 8950);
INSERT INTO saiyan(username, power_level)VALUES('Piccolo', 8950);
