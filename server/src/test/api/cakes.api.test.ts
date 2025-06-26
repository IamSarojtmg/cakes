const app = require("../../../src/app");
const supertest = require("supertest");

describe("POST cakse", () => {
  it("should post a new cake", async () => {
    const newCakeData = {
      name: "cake from jest",
      imageUrl:
        "https://www.flavourtownbakery.co.uk/cdn/shop/files/Galaxy-Cake-Flavourtown-Bakery.jpg?v=1699965789",
      comment: "decent cake",
      yumFactor: 3,
    };

    const res = await supertest(app).post("/cakes").send(newCakeData);
  });
});
