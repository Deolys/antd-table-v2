const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const UsersController = require('../controllers/users.js');
const AuthController = require('../controllers/auth.js');

const { requiredFields } = require('../validation.js');
const checkAuth = require('../middlewares/check-auth.js');
const checkPermission = require('../middlewares/check-permission.js');
const checkProjectKey = require('../middlewares/check-project-key.js')
const setProjectQuery = require('../middlewares/set-project-query.js')

dotenv.config();

const router = express.Router();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

router.post(
  '/users',
  checkProjectKey,
  checkAuth,
  checkPermission,
  requiredFields(['email', 'password', 'name']),
  UsersController.createUser,
);
router.get('/users', checkProjectKey, checkAuth, setProjectQuery, UsersController.getUsers);
router.get('/users/:id', checkProjectKey, checkAuth, setProjectQuery, UsersController.getUserById);
router.put(
  '/users/:id',
  checkProjectKey,
  checkAuth,
  checkPermission,
  requiredFields(['email', 'name']),
  UsersController.updateUser,
);
router.delete('/users', checkProjectKey, checkAuth, checkPermission, UsersController.deleteUser);
router.get('/user-types', checkProjectKey, checkAuth, UsersController.getUserTypes);

router.post('/auth/login', checkProjectKey, requiredFields(['email', 'password']), AuthController.login);
router.post('/auth/register', checkProjectKey, requiredFields(['email', 'password']), AuthController.register);
router.get('/auth/check', checkProjectKey, checkAuth, AuthController.getAuthorized);

app.use('/api', router);

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server listening at http://localhost:${port}/api`);
});
