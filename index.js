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

// MongoDB connection URL
const databaseURL = process.env.MONGO;

// Create a MongoClient instance
const client = new MongoClient(databaseURL);

async function mainFunc() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    // Access the database and collection
    const database = client.db("doctorsPortal");
    const usersCollection = database.collection("users");
    const appointmentOptionCollection =
      database.collection("appointmentOptions");
    const bookingsCollection = database.collection("bookings");
    const doctorsCollection = database.collection("doctors");
    const paymentsCollection = database.collection("payments");

    app.get("/users", async (req, res) => {
      const query = {};
      const users = await usersCollection.find(query).toArray();
      res.send(users);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });
    
  } catch (error) {
    console.error(error);
  }
}

mainFunc().catch(console.log());

// Serve index.html
app.get("/", (req, res) => {
  res.send("hello");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
