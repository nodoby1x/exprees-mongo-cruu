const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.ATLAS_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const dbName = mongoose.connection.name;
    console.log(`Connected to MongoDB database: ${dbName}`);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const db = mongoose.connection;

module.exports = db;
