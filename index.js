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

function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("unauthorized access");
  }

  const token = authHeader.split(" ")[1];
  console.log(token);
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: "forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
}

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

    app.get("/jwt", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      if (user) {
        const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, {
          expiresIn: "1h",
        });
        return res.send({ accessToken: token });
      }
      res.status(403).send({ accessToken: "" });
    });

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
