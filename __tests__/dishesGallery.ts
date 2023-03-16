import request from 'supertest';
import { server } from '../src';
import {
  DishesGalleryFormData,
  DISHES_GALLERY_ROUTES,
} from '../src/entities/dishesGallery/constants';
import { emptyTestDatabase } from '../src/testUtils/database';
import * as apiResponse from '../src/entities/common/apiResponses';

const fakeDishGallery: DishesGalleryFormData = {
  image: 'fake-image.jpg',
  title: 'fake title',
};

describe('Verify dishesGallery protected endpoints', () => {
  afterAll(() => {
    server?.close();
  });

  it('endpoint: deleteDishGalleryItem', async () => {
    const res = await request(server)
      .post(DISHES_GALLERY_ROUTES.deleteDishGalleryItem)
      .send({ id: '123', ...fakeDishGallery });
    expect(res.statusCode).toEqual(401);
  });

  it('endpoint: saveDishGalleryImage', async () => {
    const res = await request(server)
      .post(DISHES_GALLERY_ROUTES.saveDishGalleryImage)
      .send({ image: 'fake-image.jpg' });
    expect(res.statusCode).toEqual(401);
  });

  it('endpoint: deleteImage', async () => {
    const res = await request(server)
      .post(DISHES_GALLERY_ROUTES.deleteImage)
      .send({ image: 'fake-image.jpg' });
    expect(res.statusCode).toEqual(401);
  });

  it('endpoint: createNewDishGalleryItem', async () => {
    const res = await request(server)
      .post(DISHES_GALLERY_ROUTES.createNewDishGalleryItem)
      .send(fakeDishGallery);
    expect(res.statusCode).toEqual(401);
  });

  it('endpoint: modigyDishGalleryItem', async () => {
    const res = await request(server)
      .post(DISHES_GALLERY_ROUTES.modifyDishGalleryItem)
      .send(fakeDishGallery);
    expect(res.statusCode).toEqual(401);
  });
});

describe('DishesGallery endpoint: createNewDishGalleryItem', () => {
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

  afterAll(() => {
    server?.close();
  });

  it('should create a new dish gallery item', async () => {
    const res = await request(server)
      .post(DISHES_GALLERY_ROUTES.createNewDishGalleryItem)
      .send(fakeDishGallery);
    expect(res.statusCode).toEqual(201);
  });

  it('should not create a new dish gallery item with wrong data', async () => {
    const res = await request(server)
      .post(DISHES_GALLERY_ROUTES.createNewDishGalleryItem)
      .send({ name: 'toto', image: 'image.jpg' });
    expect(res.statusCode).toEqual(400);
  });
});

describe('DishesGallery endpoint: getAllDishesGallery', () => {
  beforeAll(async () => {
    await emptyTestDatabase();
  });

  afterAll(() => {
    server?.close();
  });

  it('should retreive all the dishes', async () => {
    const dishOne = await request(server)
      .post(DISHES_GALLERY_ROUTES.createNewDishGalleryItem)
      .send(fakeDishGallery);
    expect(dishOne.statusCode).toEqual(201);
    const dishTwo = await request(server)
      .post(DISHES_GALLERY_ROUTES.createNewDishGalleryItem)
      .send({ title: 'second dish', image: 'second-image.jpg' });
    expect(dishTwo.statusCode).toEqual(201);
    const dishThree = await request(server)
      .post(DISHES_GALLERY_ROUTES.createNewDishGalleryItem)
      .send({ title: 'third dish', image: 'third-image.jpg' });
    expect(dishThree.statusCode).toEqual(201);
    const res = await request(server).get(
      DISHES_GALLERY_ROUTES.getAllDishesGallery
    );
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text).data.length).toEqual(3);
  });
});

describe('DishesGallery endpoint: modifyDishGalleryItem', () => {
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

  afterAll(() => {
    server?.close();
  });

  it('should modify an existing dish gallery item', async () => {
    const newDish = await request(server)
      .post(DISHES_GALLERY_ROUTES.createNewDishGalleryItem)
      .send(fakeDishGallery);
    expect(newDish.statusCode).toEqual(201);
    const retreivedDish = await request(server).get(
      DISHES_GALLERY_ROUTES.getAllDishesGallery
    );
    expect(retreivedDish.statusCode).toEqual(200);
    const dish = JSON.parse(retreivedDish.text).data[0];
    const res = await request(server)
      .post(DISHES_GALLERY_ROUTES.modifyDishGalleryItem)
      .send({ ...dish, title: 'new title', image: 'new-image.jpg' });
    expect(res.statusCode).toEqual(200);
    const newRetreivedDish = await request(server).get(
      DISHES_GALLERY_ROUTES.getAllDishesGallery
    );
    expect(newRetreivedDish.statusCode).toEqual(200);
    const finalDish = JSON.parse(newRetreivedDish.text).data[0];
    expect(finalDish.title).toEqual('new title');
    expect(finalDish.image).toContain('new-image.jpg');
  });

  it('should not modify a non-existing gallery item', async () => {
    const res = await request(server)
      .post(DISHES_GALLERY_ROUTES.modifyDishGalleryItem)
      .send({ id: '123', title: 'anything', image: 'whatever.jpg' });
    expect(res.statusCode).toEqual(500);
  });
});

describe('DishesGallery endpoint: deleteDishGalleryItem', () => {
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

  afterAll(() => {
    server?.close();
  });

  it('should not delete a non existing item', async () => {
    const res = await request(server)
      .post(DISHES_GALLERY_ROUTES.deleteDishGalleryItem)
      .send({ id: '123', title: 'anything', image: 'image.jpg' });
    expect(res.statusCode).toEqual(500);
  });

  it('should delete an existing item', async () => {
    const newDish = await request(server)
      .post(DISHES_GALLERY_ROUTES.createNewDishGalleryItem)
      .send(fakeDishGallery);
    expect(newDish.statusCode).toEqual(201);
    const retreivedDish = await request(server).get(
      DISHES_GALLERY_ROUTES.getAllDishesGallery
    );
    expect(retreivedDish.statusCode).toEqual(200);
    const dish = JSON.parse(retreivedDish.text).data[0];
    const deletedDish = await request(server)
      .post(DISHES_GALLERY_ROUTES.deleteDishGalleryItem)
      .send(dish);
    expect(deletedDish.statusCode).toEqual(200);
    const finalDishes = await request(server).get(
      DISHES_GALLERY_ROUTES.getAllDishesGallery
    );
    expect(finalDishes.statusCode).toEqual(400);
  });
});
