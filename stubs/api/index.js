const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const UsersController = require('../controllers/users.js');
const handleValidationErrors = require('../middlewares/validation-errors.js');
const { userCreateValidation } = require('../validation.js');

dotenv.config();

const router = express.Router();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

router.post('/users', userCreateValidation, handleValidationErrors, UsersController.createUser);
router.get('/users', UsersController.getUsers);
router.get('/users/:id', UsersController.getUserById);
router.put('/users/:id', userCreateValidation, handleValidationErrors, UsersController.updateUser);
router.delete('/users', UsersController.deleteUser);
router.get('/user-types', UsersController.getUserTypes);

app.use('/api', router);

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server listening at http://localhost:${port}/api`);
});
