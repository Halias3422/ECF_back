import request from 'supertest';
import { server } from '../src';
import {
  CATEGORIES_ROUTES,
  CategoryFormData,
} from '../src/entities/categories/constant';
import { DISHES_ROUTES, DishFormData } from '../src/entities/dishes/constants';
import { emptyTestDatabase } from '../src/testUtils/database';
import * as apiResponse from '../src/entities/common/apiResponses';

const categoryForm: CategoryFormData = {
  name: 'Dessert',
  position: 0,
};

const dishForm: DishFormData = {
  category: 'Dessert',
  image: 'glace-menthe.jpg',
  title: 'glace à la menthe',
  description: 'un généreux dessert pour les plus gourmands',
  position: 0,
  price: '19.99',
};

describe('Dishes verify authorization for protected endpoints', () => {
  afterAll(async () => {
    server?.close();
  });

  it('endpoint: create new dish', async () => {
    const res = await request(server)
      .post(DISHES_ROUTES.createNewDish)
      .send(dishForm);
    expect(res.statusCode).toEqual(401);
  });

  it('endpoint: delete dish item', async () => {
    const res = await request(server)
      .post(DISHES_ROUTES.deleteDishItem)
      .send('123');
    expect(res.statusCode).toEqual(401);
  });

  it('endpoint: save dish image', async () => {
    const res = await request(server)
      .post(DISHES_ROUTES.saveDishImage)
      .send('toto');
    expect(res.statusCode).toEqual(401);
  });

  it('endpoint: delete image', async () => {
    const res = await request(server)
      .post(DISHES_ROUTES.deleteDishImage)
      .send('toto');
    expect(res.statusCode).toEqual(401);
  });

  it('endpoint: modify dish item', async () => {
    const res = await request(server)
      .post(DISHES_ROUTES.modifyDishItem)
      .send('toto');
    expect(res.statusCode).toEqual(401);
  });
});

describe('Dishes endpoints: createNewDish', () => {
  beforeAll(async () => {
    await emptyTestDatabase();
    jest.spyOn(apiResponse, 'verifyAuthorization').mockImplementation(() =>
      Promise.resolve({
        statusCode: 200,
        data: [{ placeholder: 'placeholder' }],
        response: 'user logged in',
      })
    );
  });

  afterAll(async () => {
    server?.close();
  });

  it('should create a new dish', async () => {
    const newCategory = await request(server)
      .post(CATEGORIES_ROUTES.createNewCategory)
      .send(categoryForm);
    expect(newCategory.statusCode).toEqual(201);
    const res = await request(server)
      .post(DISHES_ROUTES.createNewDish)
      .send(dishForm);
    expect(res.statusCode).toEqual(201);
  });

  it("shouldn't create a dish with wrong data", async () => {
    const res = await request(server).post(DISHES_ROUTES.createNewDish).send({
      category: 'Dessert',
      title: 'dish title',
      price: 19.99,
      something: 'wrong',
    });
    expect(res.statusCode).toEqual(400);
  });

  it("shouldn't create a dish with non-existing category", async () => {
    const res = await request(server)
      .post(DISHES_ROUTES.createNewDish)
      .send({ ...dishForm, category: 'Fake' });
    expect(res.statusCode).toEqual(400);
  });

  it("shouldn't create a dish with duplicate name", async () => {
    const res = await request(server)
      .post(DISHES_ROUTES.createNewDish)
      .send({ ...dishForm, image: 'pizza.jpg' });
    expect(res.statusCode).toEqual(400);
  });

  it("shouldn't create a dish with duplicate image", async () => {
    const res = await request(server)
      .post(DISHES_ROUTES.createNewDish)
      .send({ ...dishForm, title: 'another dish' });
    expect(res.statusCode).toEqual(400);
  });
});

const categories: CategoryFormData[] = [
  {
    name: 'Dessert',
    position: 0,
  },
  {
    name: 'Entree',
    position: 1,
  },
  {
    name: 'Plat principal',
    position: 2,
  },
];

const dishes: DishFormData[] = [
  {
    category: 'Dessert',
    image: 'image-dish-1.jpg',
    title: 'dish 1 title',
    description: 'dish 1 description',
    price: '19.99',
    position: 0,
  },
  {
    category: 'Dessert',
    image: 'image-dish-2.jpg',
    title: 'dish 2 title',
    description: 'dish 2 description',
    price: '24.99',
    position: 1,
  },
  {
    category: 'Entree',
    image: 'image-dish-3.jpg',
    title: 'dish 3 title',
    description: 'dish 3 description',
    price: '14.99',
    position: 0,
  },
];

describe('Dishes endpoints: getAllDishesByCategories', () => {
  beforeAll(async () => {
    await emptyTestDatabase();
  });

  afterAll(async () => {
    server?.close();
  });

  it('should return an error if there are no dishes', async () => {
    const res = await request(server).get(
      DISHES_ROUTES.getAllDishesByCategories
    );
    expect(res.statusCode).toEqual(400);
  });

  it('should return all dishes with correct information sorted by category', async () => {
    for (const category of categories) {
      const newCategory = await request(server)
        .post(CATEGORIES_ROUTES.createNewCategory)
        .send(category);
      expect(newCategory.statusCode).toEqual(201);
    }
    for (const dish of dishes) {
      const newDish = await request(server)
        .post(DISHES_ROUTES.createNewDish)
        .send(dish);
      expect(newDish.statusCode).toEqual(201);
    }
    const res = await request(server).get(
      DISHES_ROUTES.getAllDishesByCategories
    );
    const entries = res.body.data;
    expect(entries.length).toEqual(2);
    expect(entries[0].category.name).toEqual('Dessert');
    expect(entries[0].dishes.length).toEqual(2);
    expect(entries[0].dishes[0].title).toEqual('dish 1 title');
    expect(entries[0].dishes[0].image).toContain('image-dish-1.jpg');
    expect(entries[0].dishes[0].description).toEqual('dish 1 description');
    expect(entries[0].dishes[0].price).toEqual('19.99');
    expect(entries[0].dishes[1].title).toEqual('dish 2 title');
    expect(entries[0].dishes[1].image).toContain('image-dish-2.jpg');
    expect(entries[0].dishes[1].description).toEqual('dish 2 description');
    expect(entries[0].dishes[1].price).toEqual('24.99');
    expect(entries[1].category.name).toEqual('Entree');
    expect(entries[1].dishes.length).toEqual(1);
    expect(entries[1].dishes[0].title).toEqual('dish 3 title');
    expect(entries[1].dishes[0].image).toContain('image-dish-3.jpg');
    expect(entries[1].dishes[0].description).toEqual('dish 3 description');
    expect(entries[1].dishes[0].price).toEqual('14.99');
  });
});

describe('Dishes endpoints: deleteDishItem', () => {
  let retreivedDish: any;

  beforeAll(async () => {
    await emptyTestDatabase();
    const newCategory = await request(server)
      .post(CATEGORIES_ROUTES.createNewCategory)
      .send(categoryForm);
    expect(newCategory.statusCode).toEqual(201);
    const newDish = await request(server)
      .post(DISHES_ROUTES.createNewDish)
      .send(dishForm);
    expect(newDish.statusCode).toEqual(201);
    const allDishes = await request(server).get(
      DISHES_ROUTES.getAllDishesByCategories
    );
    for (const category of allDishes.body.data) {
      for (const dish of category.dishes) {
        if (dish.title === dishForm.title) {
          retreivedDish = dish;
        }
      }
    }
    expect(retreivedDish.title).toEqual(dishForm.title);
  });

  afterAll(async () => {
    server?.close();
  });

  it('should not delete a dish with wrong format', async () => {
    const res = await request(server)
      .post(DISHES_ROUTES.deleteDishItem)
      .send({ ...retreivedDish, id: '123' });
    expect(res.statusCode).toEqual(500);
  });

  it('should delete a dish', async () => {
    const res = await request(server)
      .post(DISHES_ROUTES.deleteDishItem)
      .send(retreivedDish);
    expect(res.statusCode).toEqual(200);
  });
});

describe('Dishes endpoints: modifyDishItem', () => {
  beforeAll(async () => {
    await emptyTestDatabase();
  });
  afterAll(async () => {
    server?.close();
  });

  it('should modify a dish', async () => {
    const newCategory = await request(server)
      .post(CATEGORIES_ROUTES.createNewCategory)
      .send(categoryForm);
    expect(newCategory.statusCode).toEqual(201);
    const newDish = await request(server)
      .post(DISHES_ROUTES.createNewDish)
      .send(dishForm);
    expect(newDish.statusCode).toEqual(201);
    const allDishes = await request(server).get(
      DISHES_ROUTES.getAllDishesByCategories
    );
    let retreivedDish;
    for (const category of allDishes.body.data) {
      for (const dish of category.dishes) {
        if (dish.title === dishForm.title) {
          retreivedDish = dish;
        }
      }
    }
    expect(retreivedDish.title).toEqual(dishForm.title);
    const modify = await request(server)
      .post(DISHES_ROUTES.modifyDishItem)
      .send({ ...retreivedDish, title: 'title modified' });
    expect(modify.statusCode).toEqual(200);
    let retreivedFinalDish;
    const modifiedDish = await request(server).get(
      DISHES_ROUTES.getAllDishesByCategories
    );
    for (const category of modifiedDish.body.data) {
      for (const dish of category.dishes) {
        if (dish.title === 'titleModified') {
          retreivedFinalDish = dish;
        }
      }
    }
    expect(retreivedFinalDish).not.toBeNull();
  });
});

describe('Dishes endpoints: verifyIfDuplicateTitleOrImage', () => {
  beforeAll(async () => {
    await emptyTestDatabase();
    const newCategory = await request(server)
      .post(CATEGORIES_ROUTES.createNewCategory)
      .send(categoryForm);
    expect(newCategory.statusCode).toEqual(201);
    const newDish = await request(server)
      .post(DISHES_ROUTES.createNewDish)
      .send(dishForm);
    expect(newDish.statusCode).toEqual(201);
  });
  afterAll(async () => {
    server?.close();
  });

  it('should find the duplicate by title', async () => {
    const res = await request(server)
      .get(DISHES_ROUTES.verifyIfDuplicateTitleOrImage)
      .query({ ...dishForm, image: 'image-fake.jpg' });
    expect(res.statusCode).toEqual(400);
  });

  it('should find the duplicate by image', async () => {
    const res = await request(server)
      .get(DISHES_ROUTES.verifyIfDuplicateTitleOrImage)
      .query({ ...dishForm, title: 'new fake title' });
    expect(res.statusCode).toEqual(400);
  });

  it('should not find any duplicate', async () => {
    const res = await request(server)
      .get(DISHES_ROUTES.verifyIfDuplicateTitleOrImage)
      .query({ ...dishForm, title: 'new fake title', image: 'image-fake.jpg' });
    expect(res.statusCode).toEqual(200);
  });
});
