const router = require('express').Router();
const applyController = require('../controllers/applyController');
const {verifyToken,verifyAndAuth,verifyAgent} = require('../middleware/verifyToken');

router.post('/',verifyAndAuth, applyController.apply);

router.get('/', verifyAndAuth, applyController.getApplied);

module.exports = router;
