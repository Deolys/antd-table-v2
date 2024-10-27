const User = require('../schemas/user.js');
const { checkConnection } = require('../utils/db-utils.js');
const { db } = require('../db.js');

const createUser = async (req, res) => {
  checkConnection(db);

  const { name, email, password, type_id } = req.body;
  const lastVisitDate = new Date().toISOString().split('T')[0];

  try {
    const newUser = new User({
      name,
      email,
      password,
      type_id,
      last_visit_date: lastVisitDate,
    });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  checkConnection(db);

  const { email, name, type_id, dateRange, skip = 0, limit = 10 } = req.query;
  let query = {};

  if (email) {
    query.email = { $regex: email, $options: 'i' };
  }

  if (name) {
    query.name = { $regex: name, $options: 'i' };
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
      return res.status(400).json({ error: `Invalid date range format: ${error}` });
    }
  }

  try {
    const users = await User.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: 'user-types',
          localField: 'type_id',
          foreignField: 'id',
          as: 'type',
        },
      },
      {
        $unwind: '$type',
      },
      {
        $project: {
          _id: 1,
          email: 1,
          password: 1,
          name: 1,
          last_visit_date: 1,
          type: '$type.name',
        },
      },
    ])
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    const totalCount = await User.countDocuments(query);

    res.json({ data: users, count: totalCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  checkConnection(db);

  const id = req.params.id;
  if (id === 'new-id') {
    return res.status(200).json();
  }

  try {
    const user = await User.findById(id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  checkConnection(db);

  const id = req.params.id;
  const { name, email, password, type_id } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password, type_id },
      { new: true },
    );

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
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

  res.status(400).json({ error: 'No users provided' });
};

const getUserTypes = async (req, res) => {
  checkConnection(db);

  try {
    const types = db.collection('user-types');
    const userTypes = await types.find().toArray();

    res.json(userTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = UsersController = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserTypes,
};
