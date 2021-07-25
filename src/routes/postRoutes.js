const express = require('express');
const router = express.Router();

const postController = require('../controllers/PostController');

router.post('/post', postController.createdPost);
router.get('/post', postController.getPost);

module.exports = router;