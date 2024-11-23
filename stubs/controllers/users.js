const User = require('../schemas/user.js');
const { checkConnection } = require('../utils/db-utils.js');
const { db } = require('../db.js');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  checkConnection(db);
  const {
    name,
    email,
    password,
    description,
    type_id = 1,
    project = req.headers.project.split('_')[0],
    map_data
  } = req.body;
  const lastVisitDate = new Date().toISOString().split('T')[0];

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new User({
      name,
      email,
      password: hash,
      type_id,
      project,
      description,
      map_data,
      last_visit_date: lastVisitDate,
    });
    const newUser = await doc.save();

    const { password: passwordHash, ...userData } = newUser._doc;

    res.status(201).json(userData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  checkConnection(db);
  const { email, name, type_id, dateRange, project, skip = 0, limit = 10 } = req.query;
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

  if (project) {
    query.project = project;
  }

  if (dateRange) {
    try {
      const [dateFrom, dateTo] = JSON.parse(dateRange);

      query.last_visit_date = {
        $gte: new Date(dateFrom),
        $lte: new Date(dateTo),
      };
    } catch (error) {
      return res.status(400).json({ message: `Invalid date range format: ${error}` });
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
          name: 1,
          project: 1,
          description: 1,
          map_data: 1,
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
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  checkConnection(db);

  const id = req.params.id;
  const project = req.query.project;
  
  if (id === 'new-id') {
    return res.status(200).json();
  }

  try {
    let user;

    if (project) {
      user = await User.findOne({ _id: id, project: project });
    } else {
      user = await User.findById(id);
    }

    if (user) {
      const { password, ...userData } = user._doc;
      res.json(userData);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  checkConnection(db);

  const id = req.params.id;
  const { name, email, password, description, type_id, project, map_data } = req.body;

  try {
    const updateData = { name, email, description };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      updateData.password = hash;
    }
    if (type_id) {
      updateData.type_id = type_id;
    }
    if (project) {
      updateData.project = project;
    }
    if (map_data) {
      updateData.map_data = map_data;
    }

    const user = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (user) {
      const { password, ...userData } = user._doc;
      res.json(userData);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
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
      return res.status(500).json({ message: error.message });
    }
  }

  res.status(400).json({ message: 'No users provided' });
};

const getUserTypes = async (req, res) => {
  checkConnection(db);

  try {
    const types = db.collection('user-types');
    const userTypes = await types.find().toArray();

    res.json(userTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
