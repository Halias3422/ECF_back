CREATE TABLE IF NOT EXISTS Users (
	id char(36) DEFAULT (UUID()) PRIMARY KEY,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	defaultGuestNumber INT,
	defaultAllergies VARCHAR(1000),
	sessionToken VARCHAR(500),
	isAdmin BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS Menus (
	id char(36) DEFAULT (UUID()) PRIMARY KEY,
	title VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Formulas (
	id char(36) DEFAULT (UUID()) PRIMARY KEY,
	menuId char(36) NOT NULL,
	title VARCHAR(255) NOT NULL,
	description VARCHAR(1000) NOT NULL,
	price VARCHAR(10) NOT NULL,
	Constraint FOREIGN KEY (menuId) REFERENCES Menus(id)
);

CREATE TABLE IF NOT EXISTS Schedule (
	id char(36) DEFAULT (UUID()) PRIMARY KEY,
	dayOfWeek VARCHAR(20) NOT NULL,
	morningOpening VARCHAR(10),
	morningClosing VARCHAR(10),
	afternoonOpening VARCHAR(10),
	afternoonClosing VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS Categories (
	id char(36) DEFAULT (UUID()) PRIMARY KEY,
	name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Dishes (
	id char(36) DEFAULT (UUID()) PRIMARY KEY,
	categoryId char(36) NOT NULL,
	image VARCHAR(255) NOT NULL,
	title VARCHAR(255) NOT NULL,
	description VARCHAR(1000) NOT NULL,
	price VARCHAR(10) NOT NULL,
	Constraint FOREIGN KEY (categoryId) REFERENCES Categories(id)
);


CREATE TABLE IF NOT EXISTS Gallery_dishes (
	id char(36) DEFAULT (UUID()) PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	image VARCHAR(500) NOT NULL
);

CREATE TABLE IF NOT EXISTS Reservations (
	id char(36) DEFAULT (UUID()) PRIMARY KEY,
	guestNumber INT NOT NULL,
	date VARCHAR(20) NOT NULL,
	hour VARCHAR(10) NOT NULL,
	service VARCHAR(20) NOT NULL,
	allergies VARCHAR(1000) NOT NULL,
	userId char(36),
	Constraint FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS Restaurant (
	id char(36) DEFAULT (UUID()) PRIMARY KEY,
	seatsCapacity INT NOT NULL
);

INSERT INTO Restaurant ()
VALUES (DEFAULT, 45);

INSERT INTO Categories ()
VALUES (DEFAULT, 'Entrée');

INSERT INTO Categories ()
VALUES (DEFAULT, 'Plat principal');

INSERT INTO Categories ()
VALUES (DEFAULT, 'Dessert');

INSERT INTO Categories ()
VALUES (DEFAULT, 'Salades');

INSERT INTO Categories ()
VALUES (DEFAULT, 'Burgers');

INSERT INTO Dishes ()
VALUES (DEFAULT, (SELECT id FROM Categories WHERE Categories.name = "Entrée"),'asperges-toastees.jpg', 'asperges toastees', 'description recette 1', '15.99');
INSERT INTO Dishes ()
VALUES (DEFAULT, (SELECT id FROM Categories WHERE Categories.name = "Plat principal"), 'betterave-confite.jpg', 'betterave confite', 'description recette 2', '15.99');
INSERT INTO Dishes ()
VALUES (DEFAULT, (SELECT id FROM Categories WHERE Categories.name = "Plat principal"),'courgettes-pochees.jpg', 'courgettes pochees', 'description recette 3', '15.99');
INSERT INTO Dishes ()
VALUES (DEFAULT, (SELECT id FROM Categories WHERE Categories.name = "Dessert"), 'crepes.jpg', 'crepes', 'description recette 4', '15.99');
INSERT INTO Dishes ()
VALUES (DEFAULT, (SELECT id FROM Categories WHERE Categories.name = "Dessert"), 'dessert-glace.jpg', 'glace', 'description recette 5', '15.99');

INSERT INTO Gallery_dishes ()
VALUES (DEFAULT, 'pizza au four', 'pizza-au-four.jpg');
INSERT INTO Gallery_dishes ()
VALUES (DEFAULT, 'double cheeseburger', 'double-cheeseburger.jpg');
INSERT INTO Gallery_dishes ()
VALUES (DEFAULT, 'plateau charcuterie', 'plateau-charcuterie.jpg');

INSERT INTO Schedule ()
VALUES (DEFAULT, 'lundi', '12:00', '14:00', '19:00', '22:00');
INSERT INTO Schedule ()
VALUES (DEFAULT, 'mardi', '12:00', '14:00', '19:00', '22:00');
INSERT INTO Schedule ()
VALUES (DEFAULT, 'mercredi', NULL, NULL, NULL, NULL);
INSERT INTO Schedule ()
VALUES (DEFAULT, 'jeudi', '13:00', '14:00', '18:00', '21:00');
INSERT INTO Schedule ()
VALUES (DEFAULT, 'vendredi', '12:00', '14:30', '18:00', '23:00');
INSERT INTO Schedule ()
VALUES (DEFAULT, 'samedi', NULL, NULL, '19:00', '23:00');
INSERT INTO Schedule ()
VALUES (DEFAULT, 'dimanche', '12:30', '14:00', NULL, NULL);

INSERT INTO Menus ()
VALUES (DEFAULT, 'La bonne Régalade');
INSERT INTO Formulas ()
VALUES (DEFAULT, (SELECT id FROM Menus WHERE title='La bonne Régalade'), 'Formule Complète', 'entrée + plat + dessert', '19.99');

INSERT INTO Menus ()
VALUES (DEFAULT, 'Au coin du feu');
INSERT INTO Formulas ()
VALUES (DEFAULT, (SELECT id FROM Menus WHERE title='Au coin du feu'), 'Formule Complète 2', 'entrée + plat + dessert', '24.99');
INSERT INTO Formulas ()
VALUES (DEFAULT, (SELECT id FROM Menus WHERE title='Au coin du feu'), 'Formule Allégée', 'plat + dessert ou entrée', '24.99');

INSERT INTO Menus ()
VALUES (DEFAULT, 'Le Sans limites');
INSERT INTO Formulas ()
VALUES (DEFAULT, (SELECT id FROM Menus WHERE title='Le Sans limites'), 'Formule Complète 3', 'entrée + plat + dessert', '24.99');
INSERT INTO Formulas ()
VALUES (DEFAULT, (SELECT id FROM Menus WHERE title='Le Sans limites'), 'Formule Allégée 2', 'plat + dessert ou entrée', '24.99');

INSERT INTO Menus ()
VALUES (DEFAULT, 'Le Tradition');
INSERT INTO Formulas ()
VALUES (DEFAULT, (SELECT id FROM Menus WHERE title='Le Tradition'), 'Formule Complète 4', 'entrée + plat + dessert', '19.99');

INSERT INTO Menus ()
VALUES (DEFAULT, 'Le Gourmand');
INSERT INTO Formulas ()
VALUES (DEFAULT, (SELECT id FROM Menus WHERE title='Le Gourmand'), 'Formule Complète 3', 'entrée + plat + dessert', '24.99');
INSERT INTO Formulas ()
VALUES (DEFAULT, (SELECT id FROM Menus WHERE title='Le Gourmand'), 'Formule Allégée 2', 'plat + dessert ou entrée', '24.99');
