const express = require('express');
const {
  createTopic,
  updateTopic,
  deleteTopic,
  getTopicsBySubject,
} = require('../controllers/topicController');
const { auth, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

// Topic routes (Admin only)
router.post('/', auth, adminOnly, createTopic);
router.put('/:id', auth, adminOnly, updateTopic);
router.delete('/:id', auth, adminOnly, deleteTopic);

// Get topics by subject (students/admins can view if authenticated)
router.get('/subject/:subjectId', auth, getTopicsBySubject);

module.exports = router;

