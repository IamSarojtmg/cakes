const app = require("../../../src/app");
const request = require("supertest");
const Cake = require("../../models/cakes");

describe("GET /cakes", () => {
  it("Return all the cakes that are stored in the database", async () => {
    const getReqCake = {
      name: "Get req cake",
      imageUrl: "URL of the cake",
      comment: "Tasty and great looking cake",
      yumFactor: 5,
    };

    await request(app).post("/cakes").send(getReqCake);
    const getRes = await request(app).get("/cakes");

    expect(getRes.statusCode).toBe(200);
    expect(getRes.body).toHaveProperty("cakes");

    const foundCake = getRes.body.cakes.find(
      (cake: any) => cake.name === getReqCake.name
    );
    expect(foundCake).toBeDefined();
    expect(foundCake.name).toBe(getReqCake.name);
    expect(foundCake.imageUrl).toBe(getReqCake.imageUrl);
    expect(foundCake.comment).toBe(getReqCake.comment);
    expect(foundCake.yumFactor).toBe(getReqCake.yumFactor);
  });
});

describe("POST /cakes", () => {
  it("should post a new cake", async () => {
    const newCakeData = {
      name: "cake from jest",
      imageUrl:
        "https://www.flavourtownbakery.co.uk/cdn/shop/files/Galaxy-Cake-Flavourtown-Bakery.jpg?v=1699965789",
      comment: "decent cake",
      yumFactor: 3,
    };

    const res = await request(app).post("/cakes").send(newCakeData);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("imageUrl");
    expect(res.body.name).toEqual(newCakeData.name);
    expect(typeof res.body.yumFactor).toBe("number");

    const cakeInMongoDB = await Cake.findById(res.body._id);

    expect(cakeInMongoDB).toBeDefined();
    expect(cakeInMongoDB.name).toBe(newCakeData.name);
  });

  it("should return 400 Bad Request if name is missing", async () => {
    const invalidCakeData = {
      //name missing
      imageUrl: "http://invalid.com/img.jpg",
      comment: "Valid length comment.",
      yumFactor: 3,
    };

    const res = await request(app).post("/cakes").send(invalidCakeData);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual("Please enter cake name"); // Expect an error message
  });

  //POST REQUEST IF USER DOES NOT ENTER NAME + IMAGEuRL, OR INVALID COMMENT LENGTH ...
});
