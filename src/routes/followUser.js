const express = require('express');
const router = express.Router();

const followController = require('../controllers/FollowController');

router.post('/addUser', followController.addUser);
router.post('/followingUser', followController.followingUser);
router.get('/followUser', followController.followUser);
router.get('/recommendFollow', followController.recommendFollowers);

module.exports = router;