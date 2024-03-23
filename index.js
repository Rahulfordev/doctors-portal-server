const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();

const app = express();
//port
const port = process.env.PORT || 5000;

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection URI
const uri = process.env.MONGO;

// Create a MongoClient instance
const client = new MongoClient(uri);

async function accessCollection() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    // Access the database and collection

    // Define routes
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

accessCollection();

// Serve index.html
app.get("/", (req, res) => {
  res.send("hello");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
