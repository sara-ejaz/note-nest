const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper to sign JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );
};

// Student & Admin signup
// POST /api/auth/signup
const signup = async (req, res, next) => {
  try {
    const { name, email, rollNumber, password, role } = req.body;

    if (!name || !email || !rollNumber || !password) {
      return res
        .status(400)
        .json({ message: 'Name, email, roll number and password are required' });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { rollNumber }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'User with this email or roll number already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Only allow valid roles, default to student for safety
    const userRole = role === 'admin' ? 'admin' : 'student';

    const user = await User.create({
      name,
      email,
      rollNumber,
      password: hashedPassword,
      role: userRole,
    });

    const token = generateToken(user);

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        rollNumber: user.rollNumber,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Login with email OR rollNumber
// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { emailOrRollNumber, password } = req.body;

    if (!emailOrRollNumber || !password) {
      return res
        .status(400)
        .json({ message: 'Email/Roll number and password are required' });
    }

    const user = await User.findOne({
      $or: [{ email: emailOrRollNumber }, { rollNumber: emailOrRollNumber }],
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        rollNumber: user.rollNumber,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
};

