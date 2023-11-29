CREATE DATABASE controle_ponto;

USE controle_ponto;

CREATE TABLE users
(
    userID INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (userID)
);


CREATE TABLE registers 
(
	registerID INT AUTO_INCREMENT NOT NULL,
	time TIME NOT NULL,
	date DATE NOT NULL,
	userID INT NOT NULL,
	PRIMARY KEY (registerID),
	FOREIGN KEY (userID) REFERENCES users(userID)
);