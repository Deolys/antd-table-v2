const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const UsersController = require('../controllers/users.js');
const AuthController = require('../controllers/auth.js');

const { requiredFields } = require('../validation.js');
const checkAuth = require('../middlewares/check-auth.js');
const checkPermission = require('../middlewares/check-permission.js');

dotenv.config();

const router = express.Router();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

router.post(
  '/users',
  checkAuth,
  checkPermission,
  requiredFields(['email', 'password', 'name', 'type_id']),
  UsersController.createUser,
);
router.get('/users', checkAuth, UsersController.getUsers);
router.get('/users/:id', checkAuth, UsersController.getUserById);
router.put(
  '/users/:id',
  checkAuth,
  checkPermission,
  requiredFields(['email', 'name', 'type_id']),
  UsersController.updateUser,
);
router.delete('/users', checkAuth, checkPermission, UsersController.deleteUser);
router.get('/user-types', checkAuth, UsersController.getUserTypes);

router.post('/auth/login', requiredFields(['email', 'password']), AuthController.login);
router.post('/auth/register', requiredFields(['email', 'password']), AuthController.register);
router.get('/auth/check', checkAuth, AuthController.getAuthorized);

app.use('/api', router);

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server listening at http://localhost:${port}/api`);
});
