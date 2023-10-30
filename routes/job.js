const router = require('express').Router();
const jobController = require('../controllers/jobcontroller');

module.exports = router;

router.post('/',jobController.createJob);

router.get('/',jobController.getAllJobs);

router.get('/:id',jobController.getJob);

router.put('/:id',jobController.updateJob);

router.delete('/:id',jobController.createJob);




