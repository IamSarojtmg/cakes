
export{}
const dotenv = require('dotenv')
dotenv.config();

const connectToDB = require('./src/config/db')
const app = require('./src/app')

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("Cannot find Mongo_URI");
  process.exit(1);
}

const startServer = async () => {
  try {
    await connectToDB(MONGO_URI);

    app.listen(PORT, () => {
      console.log(`BE running on http://localhost:${PORT}`);
    });
  } catch (error: unknown) {
    console.error("Failed to start backend server:", error);
    process.exit(1);
  }
};

startServer();
