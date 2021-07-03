const express = require('express');
const router = express.Router();

const draftController =  require('../controllers/DraftController');

router.post('/draft/:id', draftController.createdDraft);
router.get('/draft/:id', draftController.getDraft);


module.exports = router;