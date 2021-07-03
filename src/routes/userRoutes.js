const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

router.post('/users', userController.createdUser);
router.get('/users', userController.getUsers);
router.put('/users', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;