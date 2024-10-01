const User = require("../schemas/user.js");
const { checkConnection } = require("../utils/db-utils.js");
const express = require("express");

const router = express.Router();

module.exports = router;

const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(cors());
app.use(express.json());

app.post("/users", async (req, res) => {
  checkConnection(db);

  const { name, login, password, type_id } = req.body;
  const lastVisitDate = new Date().toISOString().split("T")[0];

  try {
    const newUser = new User({
      name,
      login,
      password,
      type_id,
      last_visit_date: lastVisitDate,
    });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/users", async (req, res) => {
  checkConnection(db);

  const { name, type_id, dateRange } = req.query;
  let query = {};

  if (name) {
    query.name = { $regex: name, $options: "i" };
  }

  if (type_id) {
    query.type_id = parseInt(type_id);
  }

  if (dateRange) {
    try {
      const [dateFrom, dateTo] = JSON.parse(dateRange);

      query.last_visit_date = {
        $gte: new Date(dateFrom),
        $lte: new Date(dateTo),
      };
    } catch (error) {
      return res
        .status(400)
        .json({ error: `Invalid date range format: ${error}` });
    }
  }

  try {
    const users = await User.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: "user-types",
          localField: "type_id",
          foreignField: "id",
          as: "type",
        },
      },
      {
        $unwind: "$type",
      },
      {
        $project: {
          _id: 1,
          login: 1,
          password: 1,
          name: 1,
          email: 1,
          last_visit_date: 1,
          type: "$type.name",
        },
      },
    ]);

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/users/:id", async (req, res) => {
  checkConnection(db);

  const id = req.params.id;
  if (id === "new-id") {
    return res.status(200).json();
  }

  try {
    const user = await User.findById(id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/users/:id", async (req, res) => {
  const id = req.params.id;
  const { name, login, password, type_id } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, login, password, type_id },
      { new: true }
    );

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/users", async (req, res) => {
  checkConnection(db);

  const ids = req.body || [];

  if (ids.length > 0) {
    try {
      await User.deleteMany({ _id: { $in: ids } });

      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.status(400).json({ error: "No users provided" });
});

app.get("/user-types", async (req, res) => {
  checkConnection(db);

  try {
    const types = db.collection("user-types");
    const userTypes = await types.find().toArray();

    res.json(userTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server listening at http://localhost:${port}`);
});
