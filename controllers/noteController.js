const Note = require('../models/Note');

// Upload notes (Admin)
// POST /api/notes
const createNote = async (req, res, next) => {
  try {
    const { title, description, subjectId, topicId, fileUrl } = req.body;

    if (!title || !subjectId || !topicId || !fileUrl) {
      return res.status(400).json({
        message: 'Title, subjectId, topicId and fileUrl are required',
      });
    }

    const note = await Note.create({
      title,
      description,
      subjectId,
      topicId,
      fileUrl,
    });

    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

// Update notes (Admin)
// PUT /api/notes/:id
const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, subjectId, topicId, fileUrl } = req.body;

    const note = await Note.findByIdAndUpdate(
      id,
      { title, description, subjectId, topicId, fileUrl },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    next(error);
  }
};

// Delete notes (Admin)
// DELETE /api/notes/:id
const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Get all notes (Student)
// GET /api/notes
const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find()
      .populate('subjectId', 'subjectName')
      .populate('topicId', 'topicName')
      .sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    next(error);
  }
};

// Get notes by subject
// GET /api/notes/subject/:subjectId
const getNotesBySubject = async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    const notes = await Note.find({ subjectId })
      .populate('subjectId', 'subjectName')
      .populate('topicId', 'topicName')
      .sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    next(error);
  }
};

// Get notes by topic
// GET /api/notes/topic/:topicId
const getNotesByTopic = async (req, res, next) => {
  try {
    const { topicId } = req.params;
    const notes = await Note.find({ topicId })
      .populate('subjectId', 'subjectName')
      .populate('topicId', 'topicName')
      .sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    next(error);
  }
};

// Search notes by title or keyword
// GET /api/notes/search?query=...
const searchNotes = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const regex = new RegExp(query, 'i'); // case-insensitive

    const notes = await Note.find({
      $or: [{ title: regex }, { description: regex }],
    })
      .populate('subjectId', 'subjectName')
      .populate('topicId', 'topicName')
      .sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNote,
  updateNote,
  deleteNote,
  getAllNotes,
  getNotesBySubject,
  getNotesByTopic,
  searchNotes,
};

