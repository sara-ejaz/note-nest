const Subject = require('../models/Subject');

// Create subject (Admin)
// POST /api/subjects
const createSubject = async (req, res, next) => {
  try {
    const { subjectName, description } = req.body;

    if (!subjectName) {
      return res.status(400).json({ message: 'Subject name is required' });
    }

    const existing = await Subject.findOne({ subjectName });
    if (existing) {
      return res.status(400).json({ message: 'Subject already exists' });
    }

    const subject = await Subject.create({ subjectName, description });

    res.status(201).json(subject);
  } catch (error) {
    next(error);
  }
};

// Update subject (Admin)
// PUT /api/subjects/:id
const updateSubject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { subjectName, description } = req.body;

    const subject = await Subject.findByIdAndUpdate(
      id,
      { subjectName, description },
      { new: true }
    );

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.json(subject);
  } catch (error) {
    next(error);
  }
};

// Delete subject (Admin)
// DELETE /api/subjects/:id
const deleteSubject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const subject = await Subject.findByIdAndDelete(id);

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.json({ message: 'Subject deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Get all subjects
// GET /api/subjects
const getAllSubjects = async (req, res, next) => {
  try {
    const subjects = await Subject.find().sort({ subjectName: 1 });
    res.json(subjects);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSubject,
  updateSubject,
  deleteSubject,
  getAllSubjects,
};

