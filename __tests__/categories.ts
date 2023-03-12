import request from 'supertest';
import { server } from '../src';
import {
  CATEGORIES_ROUTES,
  CategoryFormData,
} from '../src/entities/categories/constant';
import { emptyTestDatabase } from '../src/testUtils/database';

const categoryForm: CategoryFormData = {
  name: 'Dessert',
};

describe('Categories endpoints: createNewCategory', () => {
  beforeAll(async () => {
    await emptyTestDatabase();
  });

  afterAll(async () => {
    server?.close();
  });

  it('should create a new category', async () => {
    const res = await request(server)
      .post(CATEGORIES_ROUTES.createNewCategory)
      .send(categoryForm);
    expect(res.statusCode).toEqual(201);
  });

  it('should not create a category with wrong data', async () => {
    const res = await request(server)
      .post(CATEGORIES_ROUTES.createNewCategory)
      .send({ wrong: 'data', fake: 'property' });
    expect(res.statusCode).toEqual(400);
  });
});
