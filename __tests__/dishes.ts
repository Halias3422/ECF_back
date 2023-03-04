import request from 'supertest';
import { server } from '../src';
import { CATEGORIES_ROUTES } from '../src/entities/categories/constant';
import { DISHES_ROUTES, DishFormData } from '../src/entities/dishes/constants';
import { emptyTestDatabase } from '../src/testUtils/database';

describe('Dishes endpoints', () => {
  const categoryForm = {
    name: 'Dessert',
  };
  const dishForm: DishFormData = {
    category: 'Dessert',
    image: 'glace-menthe.jpg',
    title: 'glace à la menthe',
    description: 'un généreux dessert pour les plus gourmands',
    price: 19.99,
  };

  beforeAll(async () => {
    await emptyTestDatabase();
  });

  afterAll(async () => {
    server?.close();
  });

  it('should create a new dish', async () => {
    const newCategory = await request(server)
      .post(CATEGORIES_ROUTES.createNewCategory)
      .send(categoryForm);
    expect(newCategory.statusCode).toEqual(200);
    const res = await request(server)
      .post(DISHES_ROUTES.createNewDish)
      .send(dishForm);
    expect(res.statusCode).toEqual(200);
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
