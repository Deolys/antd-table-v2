const User = require('../schemas/user.js');

const USER_TYPE_ID = 1;
const ADMIN_TYPE_ID = 2;
const MODER_TYPE_ID = 3;
const ALLOWED_TYPES = [ADMIN_TYPE_ID, MODER_TYPE_ID];

const checkPermission = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if(!user) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { _id: id, type_id } = req.body;

    if(user.type_id == MODER_TYPE_ID) {
      req.body.project = user.project
    }

    if (
      (ALLOWED_TYPES.includes(user.type_id) || id === req.userId) &&
      (!type_id || (user.type_id === ADMIN_TYPE_ID && (id !== req.userId || type_id === ADMIN_TYPE_ID)) ||
    ((user.type_id === MODER_TYPE_ID && (id !== req.userId ? type_id === USER_TYPE_ID : type_id === MODER_TYPE_ID))))
    ) {
      next();
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = checkPermission;
