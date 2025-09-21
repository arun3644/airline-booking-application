const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { isEmail } = require('../utils/validateInput');

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please provide name, email and password');
    }
    if (!isEmail(email)) {
      res.status(400);
      throw new Error('Invalid email');
    }
    const exists = await User.findOne({ email });
    if (exists) {
      res.status(400);
      throw new Error('User already exists');
    }
    const user = await User.create({ name, email, password, role });
    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token: generateToken(user)
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide email and password');
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error('Invalid credentials');
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      res.status(401);
      throw new Error('Invalid credentials');
    }
    res.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token: generateToken(user)
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
