import request from "supertest";
import { server } from "../src";
import {
  UserAuthData,
  UserOptionalData,
  USERS_ROUTES,
} from "../src/entities/users/constants";
import { emptyTestDatabase } from "../src/testUtils/database";
import * as apiResponse from "../src/entities/common/apiResponses";

const userSignUp: UserAuthData = {
  email: "test@mail.com",
  password: "sup3rsecretp@ssword",
};

const userOptionalData: UserOptionalData = {
  email: "test@mail.com",
  defaultGuestNumber: 3,
  defaultAllergies: "",
};

const userDuplicateSignup: UserAuthData = {
  email: "test@mail.com",
  password: "oth3r@wesomepassword",
};

describe("Users verify authorization for protected endpoints", () => {
  afterAll(async () => {
    server?.close();
  });

  it("endpoint: updateOptionalInfo", async () => {
    const res = await request(server)
      .post(USERS_ROUTES.updateOptionalInfo)
      .send(userOptionalData);
    expect(res.statusCode).toEqual(401);
  });

  it("endpoint: getOptionalInfo", async () => {
    const res = await request(server).get(USERS_ROUTES.getOptionalInfo);
    expect(res.statusCode).toEqual(401);
  });

  it("endpoint: getRole", async () => {
    const res = await request(server).get(USERS_ROUTES.getRole);
    expect(res.statusCode).toEqual(401);
  });

  it("endpoint: updateMail", async () => {
    const res = await request(server).post(USERS_ROUTES.updateMail);
    expect(res.statusCode).toEqual(401);
  });

  it("endpoint: updatePassword", async () => {
    const res = await request(server).post(USERS_ROUTES.updatePassword);
    expect(res.statusCode).toEqual(401);
  });
});

describe("Users endpoints: signup", () => {
  beforeAll(async () => {
    await emptyTestDatabase();
    jest.spyOn(apiResponse, "verifyUserAuthorization").mockImplementation(() =>
      Promise.resolve({
        statusCode: 200,
        data: [{ placeholder: "placeholder" }],
        response: "user logged in",
      })
    );
  });

  afterAll(async () => {
    server?.close();
  });

  it("should create a new user", async () => {
    const res = await request(server)
      .post(USERS_ROUTES.signup)
      .send(userSignUp);
    expect(res.statusCode).toEqual(201);
  });

  it("should not create a second user with the same email", async () => {
    const res = await request(server)
      .post(USERS_ROUTES.signup)
      .send(userDuplicateSignup);
    expect(res.statusCode).toEqual(400);
  });

  it("should return a token", async () => {
    const res = await request(server)
      .post(USERS_ROUTES.signup)
      .send({ ...userSignUp, email: "newuser@mail.com" });
    expect(res.statusCode).toEqual(201);
    expect(res.body.session.length).toBeGreaterThan(0);
  });

  it("should add optional data to the user", async () => {
    const res = await request(server)
      .post(USERS_ROUTES.updateOptionalInfo)
      .send(userOptionalData);
    expect(res.statusCode).toEqual(200);
  });

  it("should not add optional data with wrong mail", async () => {
    const res = await request(server)
      .post(USERS_ROUTES.updateOptionalInfo)
      .send({ ...userOptionalData, email: "fake@mail.com" });
    expect(res.statusCode).toEqual(400);
  });

  it("should not add optional data with wrong value type", async () => {
    const res = await request(server)
      .post(USERS_ROUTES.updateOptionalInfo)
      .send({ ...userOptionalData, defaultGuestNumber: "toto" });
    expect(res.statusCode).toEqual(400);
  });

  it("should create a new user with a 8 character long conform password", async () => {
    const res = await request(server).post(USERS_ROUTES.signup).send({
      email: "test@eightpass.com",
      password: "12#%$ert",
    });
    expect(res.statusCode).toEqual(201);
  });

  it("should create a new user with a 99 character long conform password", async () => {
    let longPass = "123$%@";
    for (let i = 0; i < 93; i++) {
      longPass += "a";
    }
    const res = await request(server).post(USERS_ROUTES.signup).send({
      email: "test@longpassword.com",
      password: longPass,
    });
    expect(res.statusCode).toEqual(201);
  });

  it("should not create a user with an invalid email", async () => {
    const firstTry = await request(server).post(USERS_ROUTES.signup).send({
      email: "test",
      password: "sup3rsecretp@ssword",
    });
    expect(firstTry.statusCode).toEqual(400);
    const secondTry = await request(server).post(USERS_ROUTES.signup).send({
      email: "test@test",
      password: "sup3rsecretp@ssword",
    });
    expect(secondTry.statusCode).toEqual(400);
    const thirdTry = await request(server).post(USERS_ROUTES.signup).send({
      email: "test@test.coooom",
      password: "sup3rsecretp@ssword",
    });
    expect(thirdTry.statusCode).toEqual(400);
    const fourthTry = await request(server).post(USERS_ROUTES.signup).send({
      email: "@test.com",
      password: "sup3rsecretp@ssword",
    });
    expect(fourthTry.statusCode).toEqual(400);
    const fifthTry = await request(server).post(USERS_ROUTES.signup).send({
      email: "test.com",
      password: "sup3rsecretp@ssword",
    });
    expect(fifthTry.statusCode).toEqual(400);
    const sixthTry = await request(server).post(USERS_ROUTES.signup).send({
      email: "test@.com",
      password: "sup3rsecretp@ssword",
    });
    expect(sixthTry.statusCode).toEqual(400);
  });

  it("should not create a user with an invalid password", async () => {
    const firstTry = await request(server).post(USERS_ROUTES.signup).send({
      email: "test@firsttest.com",
      password: "su@3rte",
    });
    expect(firstTry.statusCode).toEqual(400);
    let longPass = "3!";
    for (let i = 0; i < 98; i++) {
      longPass += "a";
    }
    const secondTry = await request(server).post(USERS_ROUTES.signup).send({
      email: "test@secondtest.com",
      password: longPass,
    });
    expect(secondTry.statusCode).toEqual(400);
    const thirdTry = await request(server).post(USERS_ROUTES.signup).send({
      email: "test@thirdtest.com",
      password: "sup3rsecretpassword",
    });
    expect(thirdTry.statusCode).toEqual(400);
    const fourthTry = await request(server).post(USERS_ROUTES.signup).send({
      email: "test@fourthtest.com",
      password: "supersecretp@ssword",
    });
    expect(fourthTry.statusCode).toEqual(400);
    const fifthTry = await request(server).post(USERS_ROUTES.signup).send({
      email: "test@fifthtest.com",
      password: "12345@6789",
    });
    expect(fifthTry.statusCode).toEqual(400);
    const sixthTry = await request(server).post(USERS_ROUTES.signup).send({
      email: "test@sixthtest.com",
      password: "@!$&password",
    });
    expect(sixthTry.statusCode).toEqual(400);
  });
});

describe("Users endpoints: login", () => {
  beforeAll(async () => {
    await emptyTestDatabase();
  });

  afterAll(async () => {
    server?.close();
  });

  it("should find the user", async () => {
    const newUser = await request(server)
      .post(USERS_ROUTES.signup)
      .send(userSignUp);
    expect(newUser.statusCode).toEqual(201);
    const login = await request(server)
      .post(USERS_ROUTES.login)
      .send(userSignUp);
    expect(login.statusCode).toEqual(200);
  });

  it("should return a token", async () => {
    const login = await request(server)
      .post(USERS_ROUTES.login)
      .send(userSignUp);
    expect(login.statusCode).toEqual(200);
    expect(login.body.session.length).toBeGreaterThan(0);
  });

  it("should return a different token every time", async () => {
    const login = await request(server)
      .post(USERS_ROUTES.login)
      .send(userSignUp);
    expect(login.statusCode).toEqual(200);
    const secondLogin = await request(server)
      .post(USERS_ROUTES.login)
      .send(userSignUp);
    expect(login.statusCode).toEqual(200);
    expect(login.text).not.toBe(secondLogin.text);
  });

  it("should not find the user with an incorrect email", async () => {
    const login = await request(server).post(USERS_ROUTES.login).send({
      email: "teste@mail.com",
      password: userSignUp.password,
    });
    expect(login.statusCode).toEqual(400);
  });

  it("should not find the user with an incorrect password", async () => {
    const login = await request(server).post(USERS_ROUTES.login).send({
      email: userSignUp.email,
      password: "sup3rsecretp@sswor",
    });
    expect(login.statusCode).toEqual(400);
  });
});

describe("Users endpoints: updateMail", () => {
  beforeAll(async () => {
    await emptyTestDatabase();
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    server?.close();
  });

  it("should update a user email", async () => {
    const userSignup = await request(server)
      .post(USERS_ROUTES.signup)
      .send(userSignUp);
    expect(userSignup.statusCode).toEqual(201);
    const res = await request(server)
      .post(USERS_ROUTES.updateMail)
      .set("Authorization", JSON.parse(userSignup.text).session)
      .send({ email: "toto@gmail.com", password: userSignUp.password });
    expect(res.statusCode).toEqual(200);
    const loggedIn = await request(server)
      .post(USERS_ROUTES.login)
      .send({ email: "toto@gmail.com", password: userSignUp.password });
    expect(loggedIn.statusCode).toEqual(200);
  });

  it("should not update an invalid email", async () => {
    const userLogin = await request(server)
      .post(USERS_ROUTES.login)
      .send({ email: "toto@gmail.com", password: userSignUp.password });
    const res = await request(server)
      .post(USERS_ROUTES.updateMail)
      .set("Authorization", JSON.parse(userLogin.text).session)
      .send({ email: "toto.com", password: userSignUp.password });
    expect(res.statusCode).toEqual(400);
  });
});

describe("Users endpoints: updatePassword", () => {
  beforeAll(async () => {
    await emptyTestDatabase();
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    server?.close();
  });

  it("should update a user password", async () => {
    const userSignup = await request(server)
      .post(USERS_ROUTES.signup)
      .send(userSignUp);
    expect(userSignup.statusCode).toEqual(201);
    const res = await request(server)
      .post(USERS_ROUTES.updatePassword)
      .set("Authorization", JSON.parse(userSignup.text).session)
      .send({
        newPassword: "newsecr3tp@ssword",
        password: userSignUp.password,
      });
    expect(res.statusCode).toEqual(200);
    const loggedIn = await request(server)
      .post(USERS_ROUTES.login)
      .send({ email: userSignUp.email, password: "newsecr3tp@ssword" });
    expect(loggedIn.statusCode).toEqual(200);
  });

  it("should not update an invalid password", async () => {
    const userLogin = await request(server)
      .post(USERS_ROUTES.login)
      .send({ email: userSignUp.email, password: "newsecr3tp@ssword" });
    const res = await request(server)
      .post(USERS_ROUTES.updateMail)
      .set("Authorization", JSON.parse(userLogin.text).session)
      .send({ newPassword: "totoestla", password: userSignUp.password });
    expect(res.statusCode).toEqual(400);
  });
});
