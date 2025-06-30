export {};
const mongoose = require("mongoose");
const CakesModel = require("../models/cakes");

const TEST_MONGO_URI = process.env.TEST_MONGODB_URI;

// beforeAll Connect to the test database once before all tests in the suite run
beforeAll(async () => {
  if (!TEST_MONGO_URI) {
    throw new Error(
      "TEST_MONGODB_URI environment variable is not defined in .env. Please set it."
    );
  }
  await mongoose.connect(TEST_MONGO_URI);
  console.log("\n--- Connected to Test MongoDB ---");
});

afterEach(async () => {
  await CakesModel.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  console.log("--- Disconnected from Test MongoDB ---");
});
