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
  position: 0,
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

  it('deleteCategory', async () => {
    const res = await request(server)
      .post(CATEGORIES_ROUTES.deleteCategory)
      .send(categoryForm);
    expect(res.statusCode).toEqual(401);
  });

  it('modifyCategory', async () => {
    const res = await request(server)
      .post(CATEGORIES_ROUTES.modifyCategory)
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

describe('Categories endpoints: getAllCategories', () => {
  beforeAll(async () => {
    await emptyTestDatabase();
  });

  afterAll(async () => {
    server?.close();
  });

  it('should retreive all the categories', async () => {
    const categoryOne = await request(server)
      .post(CATEGORIES_ROUTES.createNewCategory)
      .send(categoryForm);
    expect(categoryOne.statusCode).toEqual(201);
    const categoryTwo = await request(server)
      .post(CATEGORIES_ROUTES.createNewCategory)
      .send({ name: 'Burger', position: 1 });
    expect(categoryTwo.statusCode).toEqual(201);
    const categoryThree = await request(server)
      .post(CATEGORIES_ROUTES.createNewCategory)
      .send({ name: 'Plat principal', position: 2 });
    expect(categoryThree.statusCode).toEqual(201);
    const res = await request(server).get(CATEGORIES_ROUTES.getAllCategories);
    expect(res.statusCode).toEqual(200);
    const categories = JSON.parse(res.text).data;
    expect(categories.length).toEqual(3);
    expect(categories[0].name).toEqual('Dessert');
    expect(categories[1].name).toEqual('Burger');
    expect(categories[2].name).toEqual('Plat principal');
  });
});

describe('Categories endpoints: ModifyCategory', () => {
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

  it('should modify the category', async () => {
    const newCategory = await request(server)
      .post(CATEGORIES_ROUTES.createNewCategory)
      .send(categoryForm);
    expect(newCategory.statusCode).toEqual(201);
    const retreived = await request(server).get(
      CATEGORIES_ROUTES.getAllCategories
    );
    const foundCategory = JSON.parse(retreived.text).data[0];
    expect(retreived.statusCode).toEqual(200);
    const modified = await request(server)
      .post(CATEGORIES_ROUTES.modifyCategory)
      .send({ id: foundCategory.id, name: 'Burger', position: 1 });
    expect(modified.statusCode).toEqual(200);
    const finalRetreived = await request(server).get(
      CATEGORIES_ROUTES.getAllCategories
    );
    expect(finalRetreived.statusCode).toEqual(200);
    const finalCategory = JSON.parse(finalRetreived.text).data[0];
    expect(finalCategory.name).toEqual('Burger');
  });

  it('should not modify the category if duplicate', async () => {
    const retreived = await request(server).get(
      CATEGORIES_ROUTES.getAllCategories
    );
    const foundCategory = JSON.parse(retreived.text).data[0];
    expect(retreived.statusCode).toEqual(200);
    const newCategory = await request(server)
      .post(CATEGORIES_ROUTES.createNewCategory)
      .send({ name: 'Dessert' });
    expect(newCategory.statusCode).toEqual(201);
    const res = await request(server)
      .post(CATEGORIES_ROUTES.modifyCategory)
      .send({ id: foundCategory.id, name: 'Dessert' });
    expect(res.statusCode).toEqual(400);
  });

  it('should not modify if wrong id', async () => {
    const res = await request(server)
      .post(CATEGORIES_ROUTES.modifyCategory)
      .send({ id: '1243', name: 'Salade' });
    expect(res.statusCode).toEqual(500);
  });
});

describe('Categories endpoints: DeleteCategory', () => {
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

  it('should delete the category', async () => {
    const newCategory = await request(server)
      .post(CATEGORIES_ROUTES.createNewCategory)
      .send({ name: 'Dessert' });
    expect(newCategory.statusCode).toEqual(201);
    const retreived = await request(server).get(
      CATEGORIES_ROUTES.getAllCategories
    );
    const foundCategory = JSON.parse(retreived.text).data[0];
    expect(retreived.statusCode).toEqual(200);
    const res = await request(server)
      .post(CATEGORIES_ROUTES.deleteCategory)
      .send(foundCategory);
    expect(res.statusCode).toEqual(200);
    const finalRetreive = await request(server).get(
      CATEGORIES_ROUTES.getAllCategories
    );
    expect(JSON.parse(finalRetreive.text).data.length).toEqual(0);
  });

  it('should not delete a category with wrong ID', async () => {
    const newCategory = await request(server)
      .post(CATEGORIES_ROUTES.createNewCategory)
      .send({ name: 'Dessert' });
    expect(newCategory.statusCode).toEqual(201);
    const retreived = await request(server).get(
      CATEGORIES_ROUTES.getAllCategories
    );
    const foundCategory = JSON.parse(retreived.text).data[0];
    expect(retreived.statusCode).toEqual(200);
    const res = await request(server)
      .post(CATEGORIES_ROUTES.deleteCategory)
      .send({ id: '123', name: foundCategory.name });
    expect(res.statusCode).toEqual(500);
    const finalRetreive = await request(server).get(
      CATEGORIES_ROUTES.getAllCategories
    );
    expect(JSON.parse(finalRetreive.text).data.length).toEqual(1);
  });
});
