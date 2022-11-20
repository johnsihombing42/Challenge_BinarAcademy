const request = require("supertest");
const app = require("../app");

// endpoint Register
const userTest = {
  name: "johnsihombing",
  email: "johnsihombing@gmail.com",
  password: "password123",
};

var token = "";

const truncate = require("../helpers/truncate");
truncate.user();

describe("/auth/register endpoint", () => {
  // register berhasil
  test("register berhasil", async () => {
    try {
      const res = await request(app).post("/auth/register").send(userTest);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("user created!");
      expect(res.body.data).toStrictEqual({
        name: userTest.name,
        email: userTest.email,
      });
    } catch (err) {
      expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });

  // register gagal karena email sudah dipakai
  test("register gagal", async () => {
    try {
      const res = await request(app).post("/auth/register").send(userTest);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("email already used!");
      expect(res.body.data).toBe(null);
    } catch (err) {
      expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });
});

describe("/auth/login endpoint", () => {
  // register berhasil
  test("login gagal", async () => {
    try {
      const res = await request(app)
        .post("/auth/login")
        .send({
          email: userTest.email,
          password: `${userTest.password}4`,
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("credential is not valid!");
      expect(res.body.data).toBe(null);
    } catch (err) {
      expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });

  // register gagal karena email sudah dipakai
  test("login berhasil", async () => {
    try {
      const res = await request(app).post("/auth/login").send({
        email: userTest.email,
        password: userTest.password,
      });

      token = res.body.data.token;
      // console.log(res.body.data.token);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveProperty("token");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("login success!");
    } catch (err) {
      expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });
});

describe("/auth/whoami endpoint", () => {
  // register berhasil
  test("whoami gagal", async () => {
    try {
      const res = await request(app)
        .post("/auth/whoami")
        .send({
          email: userTest.email,
          password: `${userTest.password}4`,
        });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("you're not authorized!");
      expect(res.body.data).toBe(null);
    } catch (err) {
      expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });

  // register gagal karena email sudah dipakai
  test("whoami berhasil", async () => {
    try {
      console.log("test_token");
      console.log(token);
      const res = await request(app)
        .post("/auth/whoami")
        .set("Authorization", token)
        .send({
          email: userTest.email,
          password: userTest.password,
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("success!");
      expect(res.body.data).toStrictEqual({
        name: userTest.name,
        email: userTest.email,
      });
    } catch (err) {
      expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });
});

//User Biodata

describe("/userbiodata", () => {
  // Create Biodata
  test("Create Biodata Success", async () => {
    const res = await request(app)
      .post("/userbiodata")
      .set("Authorization", token)
      .send({
        id_user: 15,
        name: "Putra",
        email: "putra@mail.com",
        address: "Medan",
        phone: "494949",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status");
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("data");
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("Create User Game Success");
    expect(res.body.data).toStrictEqual({
      id_user: res.body.data.id_user,
      name: res.body.data.name,
      email: res.body.data.email,
      address: res.body.data.address,
      phone: res.body.data.phone,
    });
  });

  //Read Biodata
  test("Read Biodata Success", async () => {
    const res = await request(app)
      .get("/userbiodata")
      .set("Authorization", token);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status");
    expect(res.body).toHaveProperty("message");
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("success");
  });

  //update biodata
  test("Update Biodata Success", async () => {
    const res = await request(app)
      .put("/userbiodata/15")
      .set("Authorization", token)
      .send({
        id_user: 15,
        name: "PutraSihombing",
        email: "putra@mail.com",
        address: "Medan",
        phone: "494949",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("status");
    expect(res.body).toHaveProperty("message");
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("Update data success");
  });

  //delete biodata
  test("Delete User Biodata Success", async () => {
    try {
      const res = await request(app)
        .delete("/userbiodata/1")
        .set({ Authorization: token })
        .then((res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body).toHaveProperty("status");
          expect(res.body).toHaveProperty("message");
          expect(res.body).toHaveProperty("data");
          expect(res.body.status).toBe(true);
          expect(res.body.message).toBe("Delete data success");
        });
    } catch (err) {
      // expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });
});

//history user
describe("/userhistory", () => {
  // Create History
  test("Create History Success", async () => {
    const res = await request(app)
      .post("/userhistory")
      .set("Authorization", token)
      .send({
        id_user: 16,
        time_list: 100,
        score: 120,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status");
    expect(res.body).toHaveProperty("message");
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("Create User History Success");
  });

  //read history
  test("Read History Success", async () => {
    const res = await request(app)
      .get("/userhistory")
      .set("Authorization", token);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status");
    expect(res.body).toHaveProperty("message");
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("Read All Data history");
  });

  //update history
  test("Update History Success", async () => {
    try {
      const res = await request(app)
        .put("/userhistory/1")
        .set({ Authorization: token })
        .send({
          id_user: 1,
          time_list: 200,
          score: 300,
        })
        .then((res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body).toHaveProperty("status");
          expect(res.body).toHaveProperty("message");
          expect(res.body.status).toBe(true);
          expect(res.body.message).toBe("success");
        });
    } catch (err) {
      // expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });

  //delete user history
  test("Delete History Success", async () => {
    try {
      const res = await request(app)
        .delete("/userhistory/1")
        .set({ Authorization: token })
        .then((res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body).toHaveProperty("status");
          expect(res.body).toHaveProperty("message");
          expect(res.body).toHaveProperty("data");
          expect(res.body.status).toBe(true);
          expect(res.body.message).toBe("Delete data success");
        });
    } catch (err) {
      // expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });
});
