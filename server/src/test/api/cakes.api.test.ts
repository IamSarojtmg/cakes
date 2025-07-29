const app = require("../../../src/app");
const request = require("supertest");
const Cake = require("../../models/cakes");

describe("GET /cakes", () => {
  it.skip("Return all the cakes that are stored in the database", async () => {
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

  it("Return a cake depending on their ID ", async () => {
    const viewThisCake = {
      name: "Single Cake view",
      imageUrl: "URL of the cake",
      comment: "Only show this cake",
      yumFactor: 5,
    };

    const postRes = await request(app).post("/cakes").send(viewThisCake);
    expect(postRes.statusCode).toBe(201);
    const cakeId = postRes.body._id;

    const getRes = await request(app).get(`/cakes/${cakeId}`);
    expect(getRes.statusCode).toBe(200);
    expect(getRes.body).toHaveProperty("_id");
    expect(getRes.body.yumFactor).toBe(5);
    expect(getRes.body._id).toBe(cakeId);
  });
  it.skip("should return status 400 when an invalid ID is sent", async () => {
    const invalidID = "noValidID";

    const res = await request(app).get(`/cakes/${invalidID}`);

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe("Invalid Id. Please provide a valid ID");
    expect(res.body).toHaveProperty("status", "fail");
    expect(res.body).not.toHaveProperty("id");
    expect(res.body).not.toHaveProperty("_id");
    expect(res.body).not.toHaveProperty("name");
    expect(res.body).not.toHaveProperty("imageUrl");
    expect(res.body).not.toHaveProperty("comment");
    expect(res.body).not.toHaveProperty("yumFactor");
    expect(res.body).not.toHaveProperty("createdAt");
    expect(res.body).not.toHaveProperty("updatedAt");
  });
});

describe.skip("POST /cakes", () => {
  it.skip("should post a new cake", async () => {
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

  it.skip("should return 400 Bad Request if name is missing", async () => {
    const invalidCakeData = {
      //name missing
      imageUrl: "http://invalid.com/img.jpg",
      comment: "Valid length comment.",
      yumFactor: 3,
    };

    const res = await request(app).post("/cakes").send(invalidCakeData);

    expect(res.statusCode).toEqual(400);
    expect(res.body.status).toEqual("fail");
    expect(res.body.message).toBe("Please enter cake name");
    expect(res.body).not.toHaveProperty("id");
  });

  it("should return 409, if the user enters existing cake name", async () => {
    const cakeOne = {
      name: "Cake with same name",
      imageUrl:
        "https://www.flavourtownbakery.co.uk/cdn/shop/files/Galaxy-Cake-Flavourtown-Bakery.jpg?v=1699965789",
      comment: "decent cake",
      yumFactor: 3,
    };
    const cakeTwo = {
      name: "Cake with same name",
      imageUrl:
        "https://handletheheat.com/wp-content/uploads/2015/03/Best-Birthday-Cake-with-milk-chocolate-buttercream-SQUARE.jpg",
      comment: "I dont like this cake",
      yumFactor: 1,
    };

    const res = await request(app).post("/cakes").send(cakeOne);
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toEqual(cakeOne.name);
    expect(res.body).toHaveProperty("_id");

    const resTwo = await request(app).post("/cakes").send(cakeTwo);
    expect(resTwo.statusCode).toEqual(409);
    expect(resTwo.body.message).toEqual(
      "Same name detected - Please Enter a different name"
    );
    expect(resTwo.body).toHaveProperty("status", "fail");
    expect(resTwo.body).toHaveProperty("message");
    expect(resTwo.body).not.toHaveProperty("_id");

    const cakeinTestDB = await Cake.find({ name: cakeTwo.name });
    expect(cakeinTestDB).toBeDefined();
    expect(cakeinTestDB).toHaveLength(1);
  });

  //POST REQUEST IF USER DOES NOT ENTER NAME + IMAGEuRL, OR INVALID COMMENT LENGTH ...
});
