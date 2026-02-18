const express = require('express');
const {
  createNote,
  updateNote,
  deleteNote,
  getAllNotes,
  getNotesBySubject,
  getNotesByTopic,
  searchNotes,
} = require('../controllers/noteController');
const { auth, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

// Admin note management
router.post('/', auth, adminOnly, createNote);
router.put('/:id', auth, adminOnly, updateNote);
router.delete('/:id', auth, adminOnly, deleteNote);

// Student/Admin view/search notes
router.get('/', auth, getAllNotes);
router.get('/subject/:subjectId', auth, getNotesBySubject);
router.get('/topic/:topicId', auth, getNotesByTopic);
router.get('/search', auth, searchNotes);

module.exports = router;

