import request from 'supertest';
import { server } from '../src';
import {
  CATEGORIES_ROUTES,
  CategoryFormData,
} from '../src/entities/categories/constant';
import { emptyTestDatabase } from '../src/testUtils/database';
import * as apiResponse from '../src/entities/common/apiResponses';

const categoryForm: CategoryFormData = {
  name: 'Dessert',
};
describe('Categories verify authorization for protected endpoints', () => {
  afterAll(async () => {
    server?.close();
  });

  it('create new category', async () => {
    const res = await request(server)
      .post(CATEGORIES_ROUTES.createNewCategory)
      .send(categoryForm);
    expect(res.statusCode).toEqual(401);
  });
});

describe('Categories endpoints: createNewCategory', () => {
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

  it('should not create a new category with an existing name', async () => {
    const res = await request(server)
      .post(CATEGORIES_ROUTES.createNewCategory)
      .send(categoryForm);
    expect(res.statusCode).toEqual(400);
  });
});
