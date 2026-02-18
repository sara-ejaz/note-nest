const express = require('express');
const {
  addBookmark,
  removeBookmark,
  getBookmarks,
} = require('../controllers/bookmarkController');
const { auth } = require('../middlewares/authMiddleware');

const router = express.Router();

// Bookmarks are student-only (controller double-checks role)
router.post('/:noteId', auth, addBookmark);
router.delete('/:noteId', auth, removeBookmark);
router.get('/', auth, getBookmarks);

module.exports = router;

