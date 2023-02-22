/* STANDALONE TABLES */

CREATE TABLE IF NOT EXISTS Users (
	id_user BINARY(16) DEFAULT (UUID_TO_BIN(UUID())) PRIMARY KEY,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	default_guests_number INT,
	default_allergies VARCHAR(1000),
	isAdmin BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS Gallery_images (
	id_image BINARY(16) DEFAULT (UUID_TO_BIN(UUID())) PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	image VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Menus (
	id_menu BINARY(16) DEFAULT (UUID_TO_BIN(UUID())) PRIMARY KEY,
	title VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Formulas (
	id_formula BINARY(16) DEFAULT (UUID_TO_BIN(UUID())) PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	description VARCHAR(1000) NOT NULL,
	price FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS Schedule (
	id_schedule BINARY(16) DEFAULT (UUID_TO_BIN(UUID())) PRIMARY KEY,
	day_of_week INT NOT NULL,
	morning_opening TIME,
	morning_closing TIME,
	afternoon_opening TIME,
	afternoon_closing TIME
);

CREATE TABLE IF NOT EXISTS Menus (
	id_menu BINARY(16) DEFAULT (UUID_TO_BIN(UUID())) PRIMARY KEY,
	title VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Categories (
	id_category BINARY(16) DEFAULT (UUID_TO_BIN(UUID())) PRIMARY KEY,
	name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Dishes (
	id_dish BINARY(16) DEFAULT (UUID_TO_BIN(UUID())) PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	description VARCHAR(1000) NOT NULL,
	price FLOAT NOT NULL
);

/* ONE TO MANY TABLES */

CREATE TABLE IF NOT EXISTS Categories_dishes (
	category_id BINARY(16) NOT NULL,
	dish_id BINARY(16) NOT NULL,
	PRIMARY KEY (category_id, dish_id),
	Constraint FOREIGN KEY (category_id) REFERENCES Categories(id_category),
	Constraint FOREIGN KEY (dish_id) REFERENCES Dishes(id_dish)
);

CREATE TABLE IF NOT EXISTS Menus_formulas (
	id_menu_formula BINARY(16) DEFAULT (UUID_TO_BIN(UUID())) PRIMARY KEY,
	formula_id BINARY(16) NOT NULL,
	menu_id BINARY(16) NOT NULL,
	Constraint FOREIGN KEY (formula_id) REFERENCES Formulas(id_formula),
	Constraint FOREIGN KEY (menu_id) REFERENCES Menus(id_menu)
);

CREATE TABLE IF NOT EXISTS Reservations (
	id_reservation BINARY(16) DEFAULT (UUID_TO_BIN(UUID())) PRIMARY KEY,
	guests_number INT NOT NULL,
	date DATE NOT NULL,
	hour TIME NOT NULL,
	allergies VARCHAR(1000) NOT NULL,
	user_id BINARY(16) NOT NULL,
	Constraint FOREIGN KEY (user_id) REFERENCES Users(id_user)
);

/* MANY TO MANY TABLES */


/* INIT DATABASE CONTENT */

INSERT INTO Users ()
VALUES (DEFAULT, 'admin@mail.com', SHA2('password', 256), NULL, NULL, true);
