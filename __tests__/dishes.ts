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
};

const dishForm: DishFormData = {
  category: 'Dessert',
  image: 'glace-menthe.jpg',
  title: 'glace à la menthe',
  description: 'un généreux dessert pour les plus gourmands',
  price: '19.99',
};

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

  beforeEach(() => {});

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
      .send(dishForm);
    expect(res.statusCode).toEqual(400);
  });
});

const categories: CategoryFormData[] = [
  {
    name: 'Dessert',
  },
  {
    name: 'Entree',
  },
  {
    name: 'Plat principal',
  },
];

const dishes: DishFormData[] = [
  {
    category: 'Dessert',
    image: 'image-dish-1.jpg',
    title: 'dish 1 title',
    description: 'dish 1 description',
    price: '19.99',
  },
  {
    category: 'Dessert',
    image: 'image-dish-2.jpg',
    title: 'dish 2 title',
    description: 'dish 2 description',
    price: '24.99',
  },
  {
    category: 'Entree',
    image: 'image-dish-3.jpg',
    title: 'dish 3 title',
    description: 'dish 3 description',
    price: '14.99',
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
