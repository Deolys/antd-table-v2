const { checkConnection } = require('../utils/db-utils.js');
const { db } = require('../db.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../schemas/user.js');

const SECRET_ENCRYPTION_KEY = 'keyForEncryption';

const register = async (req, res) => {
  checkConnection(db);

  const { name, email, password, type_id, description } = req.body;
  const lastVisitDate = new Date().toISOString().split('T')[0];

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new User({
      name,
      email,
      password: hash,
      type_id,
      description,
      last_visit_date: lastVisitDate,
    });
    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      SECRET_ENCRYPTION_KEY,
      {
        expiresIn: '30d',
      },
    );

    const { password: passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred during registration',
    });
  }
};

const login = async (req, res) => {
  checkConnection(db);

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    const isValidPass = await bcrypt.compare(password, user._doc.password);

    if (!isValidPass) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      SECRET_ENCRYPTION_KEY,
      {
        expiresIn: '30d',
      },
    );

    const { password: passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred during authorization',
    });
  }
};

const getAuthorized = async (req, res) => {
  checkConnection(db);

  try {
    const lastVisitDate = new Date().toISOString().split('T')[0];
    const user = await User.findByIdAndUpdate(
      req.userId,
      { last_visit_date: lastVisitDate },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const { password, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    res.status(500).json({
      message: 'Access denied',
    });
  }
};

module.exports = {
  register,
  login,
  getAuthorized,
};