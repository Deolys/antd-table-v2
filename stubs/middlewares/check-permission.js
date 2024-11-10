const User = require('../schemas/user.js');

const ALLOWED_TYPES = [2, 3];

const checkPermission = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (user && ALLOWED_TYPES.includes(user.type_id)) {
      next();
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = checkPermission;
