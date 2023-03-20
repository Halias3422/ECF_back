import request from 'supertest';
import { server } from '../src';
import { FormattedMenu, MENUS_ROUTES } from '../src/entities/menus/constants';
import { emptyTestDatabase } from '../src/testUtils/database';
import * as apiResponse from '../src/entities/common/apiResponses';

const newMenu: FormattedMenu = {
  title: 'new menu',
  position: 0,
  formulas: [
    {
      title: 'formula 1',
      description: 'description 1',
      price: '5.99',
      position: 0,
    },
    {
      title: 'formula 2',
      description: 'description 2',
      price: '199.99',
      position: 1,
    },
  ],
};

describe('Verify Menus endpoints authorization', () => {
  afterAll(() => {
    server?.close();
  });

  it('endpoint: createNewMenu', async () => {
    const res = await request(server)
      .post(MENUS_ROUTES.createNewMenu)
      .send(newMenu);
    expect(res.statusCode).toEqual(401);
  });
  it('endpoint: modifyMenu', async () => {
    const res = await request(server)
      .post(MENUS_ROUTES.modifyMenu)
      .send(newMenu);
    expect(res.statusCode).toEqual(401);
  });
  it('endpoint: deleteMenu', async () => {
    const res = await request(server)
      .post(MENUS_ROUTES.deleteMenu)
      .send(newMenu);
    expect(res.statusCode).toEqual(401);
  });
});

describe('Menus endpoints: createNewMenu', () => {
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

  it('should create a new Menu with formulas', async () => {
    const res = await request(server)
      .post(MENUS_ROUTES.createNewMenu)
      .send(newMenu);
    expect(res.statusCode).toEqual(201);
    const retreivedMenu = await request(server).get(MENUS_ROUTES.getAllMenus);
    expect(JSON.parse(retreivedMenu.text).data.length).toEqual(1);
    const menu = JSON.parse(retreivedMenu.text).data[0];
    expect(menu.title).toEqual(newMenu.title);
    expect(menu.formulas[0].title).toEqual(newMenu.formulas[0].title);
    expect(menu.formulas[1].title).toEqual(newMenu.formulas[1].title);
  });

  it("shouldn't create a new Menu with wrong data", async () => {
    const res = await request(server)
      .post(MENUS_ROUTES.createNewMenu)
      .send({
        name: 'menu amazing',
        dishes: [{ title: 'dish1' }],
      });
    expect(res.statusCode).toEqual(400);
  });

  it('should create a menu with no formula', async () => {
    const res = await request(server)
      .post(MENUS_ROUTES.createNewMenu)
      .send({ title: 'another menu', formulas: [] });
    expect(res.statusCode).toEqual(201);
  });

  it("shouldn't create a duplicate menu", async () => {
    const res = await request(server)
      .post(MENUS_ROUTES.createNewMenu)
      .send(newMenu);
    expect(res.statusCode).toEqual(400);
  });
});

describe('Menus endpoints: modifyMenu', () => {
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

  it('should modify an existing menu', async () => {
    const res = await request(server)
      .post(MENUS_ROUTES.createNewMenu)
      .send(newMenu);
    expect(res.statusCode).toEqual(201);
    const retreivedMenu = await request(server).get(MENUS_ROUTES.getAllMenus);
    const menu = JSON.parse(retreivedMenu.text).data[0];
    const modifiedMenu = await request(server)
      .post(MENUS_ROUTES.modifyMenu)
      .send({
        ...menu,
        title: 'new title',
        formulas: [
          {
            ...menu.formulas[0],
            title: 'modified formula',
            description: 'modified description',
            price: 200.99,
          },
        ],
      });
    expect(modifiedMenu.statusCode).toEqual(200);
    const finalMenu = await request(server).get(MENUS_ROUTES.getAllMenus);
    const formattedMenu = JSON.parse(finalMenu.text).data[0];
    expect(formattedMenu.title).toEqual('new title');
    expect(formattedMenu.formulas.length).toEqual(1);
    expect(formattedMenu.formulas[0].title).toEqual('modified formula');
  });

  it('should not allow for a duplicate', async () => {
    const res = await request(server)
      .post(MENUS_ROUTES.createNewMenu)
      .send({ title: 'another new menu', formulas: [] });
    expect(res.statusCode).toEqual(201);
    const modify = await request(server)
      .post(MENUS_ROUTES.modifyMenu)
      .send({ ...newMenu, title: 'another new menu' });
    expect(modify.statusCode).toEqual(400);
  });

  it("shouldn't modify a non existing menu", async () => {
    const res = await request(server)
      .post(MENUS_ROUTES.modifyMenu)
      .send({ ...newMenu, id: '123' });
    expect(res.statusCode).toEqual(400);
  });
});

describe('Menu endpoints: deleteMenu', () => {
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

  it('should delete an existing menu', async () => {
    const res = await request(server)
      .post(MENUS_ROUTES.createNewMenu)
      .send(newMenu);
    expect(res.statusCode).toEqual(201);
    const retreivedMenu = await request(server).get(MENUS_ROUTES.getAllMenus);
    const menu = JSON.parse(retreivedMenu.text).data[0];
    const deletedMenu = await request(server)
      .post(MENUS_ROUTES.deleteMenu)
      .send(menu);
    expect(deletedMenu.statusCode).toEqual(200);
    const finalMenus = await request(server).get(MENUS_ROUTES.getAllMenus);
    expect(JSON.parse(finalMenus.text).data.length).toEqual(0);
  });

  it('should not delete a non existing menu', async () => {
    const res = await request(server)
      .post(MENUS_ROUTES.createNewMenu)
      .send(newMenu);
    expect(res.statusCode).toEqual(201);
    const retreivedMenu = await request(server).get(MENUS_ROUTES.getAllMenus);
    const menu = JSON.parse(retreivedMenu.text).data[0];
    const deleteMenu = await request(server)
      .post(MENUS_ROUTES.deleteMenu)
      .send({ ...menu, id: '123' });
    expect(deleteMenu.statusCode).toEqual(500);
  });
});
