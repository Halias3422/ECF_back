import request from 'supertest';
import { server } from '../src';
import { DISHES_ROUTES, DishFormData } from '../src/entities/dishes/constants';
import { emptyTestDatabase } from '../src/testUtils/database';

describe('Dishes endpoints', () => {
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

  it('should create a new dish', async () => {
    //add creation of category
    const res = await request(server)
      .post(DISHES_ROUTES.createNewDish)
      .send(dishForm);
    console.log('res = ' + JSON.stringify(res));
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('successfully');
  });

  // it("shouldn't create a dish with wrong data", async () => {
  //   const res = await request(server).post(DISHES_ROUTES.createNewDish).send({
  //     title: 'dish title',
  //     price: 19.99,
  //     something: 'wrong',
  //   });
  //   expect(res.statusCode).toEqual(500);
  //   expect(res.text).toContain('Error');
  // });
});
