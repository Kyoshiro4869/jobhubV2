const router = require('express').Router();
const {verifyToken, verifyAndAuth,verifyAgent} = require('../middleware/verifyToken');
const userController = require('../controllers/userController');



router.get('/',verifyAndAuth,userController.getUser);

router.delete('/:id',verifyAndAuth,userController.deleteUser);

router.put('/',verifyAndAuth, userController.updateUser);

router.post('/skills',verifyAndAuth,userController.addSkills);
router.get('/skills',verifyAndAuth,userController.getSkills);
router.delete('/skills/:id',verifyAndAuth,userController.deleteSkills);

router.post('/agents',verifyAndAuth,userController.addAgent);
router.put('/agents/:id',verifyAndAuth,userController.updateAgent);

router.get('/agents/:uid',verifyAndAuth,userController.getAgent);
router.get('/agents',verifyAndAuth,userController.getAgents);

module.exports = router;