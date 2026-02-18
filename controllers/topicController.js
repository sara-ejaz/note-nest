const Topic = require('../models/Topic');

// Add topic under subject (Admin)
// POST /api/topics
const createTopic = async (req, res, next) => {
  try {
    const { topicName, subjectId } = req.body;

    if (!topicName || !subjectId) {
      return res
        .status(400)
        .json({ message: 'Topic name and subjectId are required' });
    }

    const topic = await Topic.create({ topicName, subjectId });
    res.status(201).json(topic);
  } catch (error) {
    next(error);
  }
};

// Update topic (Admin)
// PUT /api/topics/:id
const updateTopic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { topicName, subjectId } = req.body;

    const topic = await Topic.findByIdAndUpdate(
      id,
      { topicName, subjectId },
      { new: true }
    );

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    res.json(topic);
  } catch (error) {
    next(error);
  }
};

// Delete topic (Admin)
// DELETE /api/topics/:id
const deleteTopic = async (req, res, next) => {
  try {
    const { id } = req.params;

    const topic = await Topic.findByIdAndDelete(id);

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    res.json({ message: 'Topic deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Get topics by subject
// GET /api/topics/subject/:subjectId
const getTopicsBySubject = async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    const topics = await Topic.find({ subjectId }).sort({ topicName: 1 });
    res.json(topics);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTopic,
  updateTopic,
  deleteTopic,
  getTopicsBySubject,
};

