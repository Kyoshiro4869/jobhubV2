const router = require('express').Router();
const {verifyToken, verifyAndAuth,verifyAgent} = require('../middleware/verifyToken');
const bookmarkController = require('../controllers/bookmarkController');



router.post('/',verifyAndAuth,bookmarkController.createBookmark);

router.delete('/:bookmarkId',verifyAndAuth,bookmarkController.deleteBookmark);

router.get('/',verifyAndAuth, bookmarkController.getAllBookmarks);
router.get('/bookmark/:id',verifyAndAuth,bookmarkController.getBookmark);

module.exports = router;