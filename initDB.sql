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
	title VARCHAR(255) NOT NULL,
	position INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Formulas (
	id char(36) DEFAULT (UUID()) PRIMARY KEY,
	menuId char(36) NOT NULL,
	title VARCHAR(255) NOT NULL,
	description VARCHAR(1000) NOT NULL,
	price VARCHAR(10) NOT NULL,
	position INT NOT NULL,
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
	name VARCHAR(255),
	position INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Dishes (
	id char(36) DEFAULT (UUID()) PRIMARY KEY,
	categoryId char(36) NOT NULL,
	image VARCHAR(255) NOT NULL,
	title VARCHAR(255) NOT NULL,
	description VARCHAR(1000) NOT NULL,
	price VARCHAR(10) NOT NULL,
	position INT NOT NULL,
	Constraint FOREIGN KEY (categoryId) REFERENCES Categories(id)
);


CREATE TABLE IF NOT EXISTS Gallery_dishes (
	id char(36) DEFAULT (UUID()) PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	image VARCHAR(500) NOT NULL,
	position INT NOT NULL
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

SET NAMES 'utf8';

INSERT INTO Restaurant ()
VALUES (DEFAULT, 45);

INSERT INTO Categories ()
VALUES (DEFAULT, 'Entrée' ,0);

INSERT INTO Categories ()
VALUES (DEFAULT, 'Plat principal', 1);

INSERT INTO Categories ()
VALUES (DEFAULT, 'Dessert', 5);

INSERT INTO Categories ()
VALUES (DEFAULT, 'Salade', 2);

INSERT INTO Categories ()
VALUES (DEFAULT, 'Burger', 3);

INSERT INTO Categories ()
VALUES (DEFAULT, 'Sandwich', 4);

INSERT INTO Dishes ()
VALUES (DEFAULT, (SELECT id FROM Categories WHERE Categories.name = 'Entrée'), 'betterave-confite.webp', 'Nos légumes confits', 'Mise en bouche végétale. Découvrez nos légumes confits, fondants en bouche. Un assortiment spécialement conçu pour mettre chaque ingrédient en valeur.', '8.99', 0);

INSERT INTO Dishes ()
VALUES (DEFAULT, (SELECT id FROM Categories WHERE Categories.name = 'Entrée'), 'pexels-ana-madeleine-uribe-2762939.webp', 'Mini pizza', "Mini pizza gourmande au fromage. Idéal pour se réchauffer et s'ouvrir l'appétit.", '6.99', 1);

INSERT INTO Dishes ()
VALUES (DEFAULT, (SELECT id FROM Categories WHERE Categories.name = 'Entrée'), 'plateau-charcuterie.webp', 'Le plateau de charcuterie', "À partager entre amis, un assortiment des meilleurs ingrédients de la région. Rien de tel pour entamer la soirée. Nous vous conseillons d'accompagner cette dégustation d'une de nos bouteilles de vin rouge.", '18.99', 2);

INSERT INTO Dishes ()
VALUES (DEFAULT, (SELECT id FROM Categories WHERE Categories.name = 'Entrée'), 'pexels-nishant-aneja-2955816.webp', 'Tourte à la viande', 'Mini tourte à la viande. Spécialité locale revisitée par le Chef. Un de nos best-sellers.', '6.99', 3);

INSERT INTO Dishes ()
VALUES (DEFAULT, (SELECT id FROM Categories WHERE Categories.name = 'Sandwich'), 'sandwich-vegetarien.webp', 'Le végétarien', "Salade, tomates, oignons, pâte à l'ail. Une explosion de saveur contenue entre deux tranches de délicieux pain complet.", '7.99', 0);

INSERT INTO Dishes ()
VALUES (DEFAULT, (SELECT id FROM Categories WHERE Categories.name = 'Sandwich'), 'pexels-rajdeepcraft-6416558.webp', 'Le rustique', "Un pain frais, un fromage mature, un jambon cru fort en saveurs, de la salade fraîche, des tomates juteuses et une touche de moutarde pour relever le tout.", '6.99', 1);


INSERT INTO Dishes ()
VALUES (DEFAULT, (SELECT id FROM Categories WHERE Categories.name = 'Plat principal'), 'asperges-toastees.webp', 'Tofu grillé et ses asperges', "Un tendre steak de tofu poêlé accompagné de ses asperges grillées et de son œuf poché.  Un repas léger et gourmand.", '12.99', 0);

INSERT INTO Dishes ()
VALUES (DEFAULT, (SELECT id FROM Categories WHERE Categories.name = 'Plat principal'), 'courgettes-pochees.webp', 'batons de courgettes grillées', "De fins bâtonnets de courgettes légèrement dorés à la poêle pour allier le croquant a la douceur de l'ingrédient. Surmonté de son œuf poché et de sa salade fraîche.", '11.99', 1);

INSERT INTO Dishes ()
VALUES (DEFAULT, (SELECT id FROM Categories WHERE Categories.name = 'Plat principal'), 'roti-epinards.webp', 'Roti aux épinards', "Un délicieux rôti tendre et juteux. En accompagnement, épinards et purée. Le tout fond dans la bouche pour un repas comme sur un nuage.", '16.99', 2);

INSERT INTO Dishes ()
VALUES (DEFAULT, (SELECT id FROM Categories WHERE Categories.name = 'Plat principal'), 'pizza-au-four.webp', 'La pizza au four', "Préparée par notre pizzaïolo, découvrez la pizza épicée aux champignons. Cuite au four à l'ancienne pour une cuisson optimale.", '14.99', 3);

INSERT INTO Dishes ()
VALUES (DEFAULT, (SELECT id FROM Categories WHERE Categories.name = 'Plat principal'), 'pexels-taha-samet-arslan-7627407.webp', 'Saumon aux épinards', "Un tendre morceau de saumon fumé légèrement doré accompagné d'épinards à la crème et de sa sauce citronnée. ", '14.99', 4);

INSERT INTO Dishes ()
VALUES (DEFAULT, (SELECT id FROM Categories WHERE Categories.name = 'Dessert'), 'pexels-nishant-aneja-2955820.webp', 'Donuts au chocolat', "Difficile d'y résister. De délicieux donuts recouverts d'un glaçage chocolaté.", '4.99', 0);

INSERT INTO Dishes ()
VALUES (DEFAULT, (SELECT id FROM Categories WHERE Categories.name = 'Dessert'), 'pexels-spotwizardlee-9884561.webp', 'Douceur au caramel', "Un flan fondant au caramel pour terminer son repas en oubliant tous ses problèmes. Encore meilleur accompagné de son café.", '7.99', 1);

INSERT INTO Dishes ()
VALUES (DEFAULT, (SELECT id FROM Categories WHERE Categories.name = 'Dessert'), 'crepes.webp', 'Les Crêpes du chef', "Redécouvrez le plaisir des crêpes d'autrefois. La recette est une des spécialités du Chef et le secret est bien gardé !", '6.99', 2);

INSERT INTO Dishes ()
VALUES (DEFAULT, (SELECT id FROM Categories WHERE Categories.name = 'Dessert'), 'dessert-glace.webp', 'Glace framboise et vanille', "Finir son repas par une glace est toujours une bonne idée. D'autant plus quand celle-ci est faite maison par des mains expertes. Un régal qui plaira à tous.", '4.99', 3);

INSERT INTO Dishes ()
VALUES (DEFAULT, (SELECT id FROM Categories WHERE Categories.name = 'Dessert'), 'pexels-dima-valkov-5665639.webp', 'Boules de coco', "De délicieuses boules de coco glacées accompagnées de leur framboise. Un dessert des plus raffinés.", '3.99', 4);

INSERT INTO Dishes ()
VALUES (DEFAULT, (SELECT id FROM Categories WHERE Categories.name = 'Dessert'), 'pexels-kelvin-agustinus-7190365.webp', 'Smoothies fruités', "Pour terminer son repas sur un goût d'été. Découvrez nos smoothies fruités, fraîcheur et plaisir garantis.", '5.99', 5);

INSERT INTO Dishes ()
VALUES (DEFAULT, (SELECT id FROM Categories WHERE Categories.name = 'Burger'), 'burger-l-affame.webp', "L'affamé", "Pour ceux qui n'ont pas froid aux yeux ! Rien ne sert d'en parler, les images parlent d'elles-mêmes.", '12.99', 0);

INSERT INTO Dishes ()
VALUES (DEFAULT, (SELECT id FROM Categories WHERE Categories.name = 'Burger'), 'double-cheeseburger.webp', "Le double Cheeseburger", "Un classique. Robuste et préparé avec les meilleurs ingrédients. ", '11.99', 1);

INSERT INTO Dishes ()
VALUES (DEFAULT, (SELECT id FROM Categories WHERE Categories.name = 'Salade'), 'salade-provencale.webp', "La salade provencale", "Un goût de soleil en Savoie. Réinvention de la salade provençale avec les produits locaux. Légère, fraîche, il lui suffit d'une noix d'huile d'olive pour faire exploser ses arômes.", '9.99', 0);

INSERT INTO Dishes ()
VALUES (DEFAULT, (SELECT id FROM Categories WHERE Categories.name = 'Salade'), 'salade-mais.webp', "Salade relevée au maïs ", "D'inspiration sud américaine. Goutez cette merveilleuse salade épicée garnie de maïs, citron, soja, épinards et d'autres délicieux ingrédients encore.", '8.99', 1);

INSERT INTO Gallery_dishes ()
VALUES (DEFAULT, 'pizza au four', 'pizza-au-four.webp', 0);
INSERT INTO Gallery_dishes ()
VALUES (DEFAULT, 'double cheeseburger', 'double-cheeseburger.webp', 1);
INSERT INTO Gallery_dishes ()
VALUES (DEFAULT, 'plateau de charcuterie', 'plateau-charcuterie.webp', 2);
INSERT INTO Gallery_dishes ()
VALUES (DEFAULT, 'Flan fondant au caramel', 'pexels-spotwizardlee-9884561.webp', 3);
INSERT INTO Gallery_dishes ()
VALUES (DEFAULT, 'Boules de coco', 'pexels-dima-valkov-5665639.webp', 4);
INSERT INTO Gallery_dishes ()
VALUES (DEFAULT, 'Le rustique', 'pexels-rajdeepcraft-6416558.webp', 5);
INSERT INTO Gallery_dishes ()
VALUES (DEFAULT, 'Smoothies fruités', 'pexels-kelvin-agustinus-7190365.webp', 6);
INSERT INTO Gallery_dishes ()
VALUES (DEFAULT, 'La tourte à la viande', 'pexels-nishant-aneja-2955816.webp', 7);

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
VALUES (DEFAULT, 'Pour les petits', 0);
INSERT INTO Formulas ()
VALUES (DEFAULT, (SELECT id FROM Menus WHERE title='Pour les petits'), 'Formule du midi', 'Plat principal + au choix Entrée ou Dessert', '16.99', 0);
INSERT INTO Formulas ()
VALUES (DEFAULT, (SELECT id FROM Menus WHERE title='Pour les petits'), 'Formule du soir', 'Plat principal + au choix Entrée ou Dessert', '14.99', 1);

INSERT INTO Menus ()
VALUES (DEFAULT, 'À emporter', 1);
INSERT INTO Formulas ()
VALUES (DEFAULT, (SELECT id FROM Menus WHERE title='À emporter'), 'Le Végétarien', 'Sandwich le Végétarien + Dessert Boules de coco
(service du midi uniquement)', '9.99', 0);
INSERT INTO Formulas ()
VALUES (DEFAULT, (SELECT id FROM Menus WHERE title='À emporter'), 'Le Rustique', 'Sandwich le Rustique + Dessert Smoothie fruité
(service du midi uniquement)', '9.99', 1);

INSERT INTO Menus ()
VALUES (DEFAULT, 'Entre amis', 2);
INSERT INTO Formulas ()
VALUES (DEFAULT, (SELECT id FROM Menus WHERE title='Entre amis'), 'À partager', 'Entrée: Plateau de charcuterie ou Tourtes à la viande
Plat principal: La pizza au four
Dessert: au choix', '34.99', 0);

INSERT INTO Menus ()
VALUES (DEFAULT, 'Le Classique', 3);
INSERT INTO Formulas ()
VALUES (DEFAULT, (SELECT id FROM Menus WHERE title='Le Classique'), 'Formule complète (midi)', 'Entrée + Plat principal + Dessert au choix
(service du midi uniquement)', '28.99', 0);
INSERT INTO Formulas ()
VALUES (DEFAULT, (SELECT id FROM Menus WHERE title='Le Classique'), 'Formule allégée (midi)', 'Plat principal + Entrée ou Dessert au choix
(service du midi uniquement)', '19.99', 1);
INSERT INTO Formulas ()
VALUES (DEFAULT, (SELECT id FROM Menus WHERE title='Le Classique'), 'Formule complète (soir)', 'Entrée + Plat principal + Dessert au choix
(service du soir uniquement)', '24.99', 2);
INSERT INTO Formulas ()
VALUES (DEFAULT, (SELECT id FROM Menus WHERE title='Le Classique'), 'Formule allégée (soir)', 'Plat principal + Entrée ou Dessert au choix
(service du soir uniquement)', '14.99', 3);
