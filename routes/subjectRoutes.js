const express = require('express');
const {
  createSubject,
  updateSubject,
  deleteSubject,
  getAllSubjects,
} = require('../controllers/subjectController');
const { auth, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

// All subject routes are admin only
router.post('/', auth, adminOnly, createSubject);
router.put('/:id', auth, adminOnly, updateSubject);
router.delete('/:id', auth, adminOnly, deleteSubject);
router.get('/', auth, adminOnly, getAllSubjects);

module.exports = router;

