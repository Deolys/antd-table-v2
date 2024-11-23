const User = require('../schemas/user.js');

const ADMIN_TYPE_ID = 2;

const setProjectQuery = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (user) {
      if (user.type_id !== ADMIN_TYPE_ID) {
        req.query.project = user.project;
      }
      next();
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = setProjectQuery;
