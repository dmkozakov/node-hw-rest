require("dotenv").config();

const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../../app");
const { User } = require("../../models");

const { DB_TEST_URI } = process.env;

// 1. Відповідь повинна мати статус-код 200
// 2. У відповіді повинен повертатися токен
// 3. У відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String

describe("login", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_URI);

    await supertest(app).post("/api/users/register").send({
      email: "triss@gmail.com",
      password: "qwertony",
    });
  });
  afterAll(async () => {
    await User.deleteMany();
    await mongoose.disconnect(DB_TEST_URI);
  });

  test("should return status code 200", async () => {
    const res = await supertest(app).post("/api/users/login").send({
      email: "triss@gmail.com",
      password: "qwertony",
    });
    console.log(res);

    expect(res.statusCode).toBe(200);
  });

  test("should return token", async () => {
    const res = await supertest(app).post("/api/users/login").send({
      email: "triss@gmail.com",
      password: "qwertony",
    });

    expect(res._body.data.token).toBeTruthy();
  });

  test("should return user email and password with type String", async () => {
    const res = await supertest(app).post("/api/users/login").send({
      email: "triss@gmail.com",
      password: "qwertony",
    });

    expect(typeof res._body.data.user.email).toBe("string");
    expect(typeof res._body.data.user.subscription).toBe("string");
  });
});
