const User = require('../models/User');

// Add note to bookmarks (Student)
// POST /api/bookmarks/:noteId
const addBookmark = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const userId = req.user.id;

    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can bookmark notes' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.bookmarks.includes(noteId)) {
      user.bookmarks.push(noteId);
      await user.save();
    }

    res.json({ message: 'Note bookmarked successfully', bookmarks: user.bookmarks });
  } catch (error) {
    next(error);
  }
};

// Remove bookmark (Student)
// DELETE /api/bookmarks/:noteId
const removeBookmark = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const userId = req.user.id;

    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can remove bookmarks' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.bookmarks = user.bookmarks.filter(
      (bookmarkId) => bookmarkId.toString() !== noteId
    );
    await user.save();

    res.json({ message: 'Bookmark removed successfully', bookmarks: user.bookmarks });
  } catch (error) {
    next(error);
  }
};

// Get all bookmarked notes (Student)
// GET /api/bookmarks
const getBookmarks = async (req, res, next) => {
  try {
    const userId = req.user.id;

    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can view bookmarks' });
    }

    const user = await User.findById(userId).populate({
      path: 'bookmarks',
      populate: [
        { path: 'subjectId', select: 'subjectName' },
        { path: 'topicId', select: 'topicName' },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.bookmarks);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addBookmark,
  removeBookmark,
  getBookmarks,
};

