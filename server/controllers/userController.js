////////////////////////////////////////////////////////////////////////////////
//  Requires
////////////////////////////////////////////////////////////////////////////////
const User = require('../models/User');

////////////////////////////////////////////////////////////////////////////////
// Get all users
////////////////////////////////////////////////////////////////////////////////
const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('thoughts friends');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

////////////////////////////////////////////////////////////////////////////////
// Get user by ID
////////////////////////////////////////////////////////////////////////////////
const getUserbyId = async ({ params }, res) => {
  const userId = params.userId;

  try {
    const users = await User.find({ _id: userId }).populate('thoughts friends');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

////////////////////////////////////////////////////////////////////////////////
// Create user
////////////////////////////////////////////////////////////////////////////////

const createUser = async ({ body }, res) => {
  try {
    const newUser = await User.create({ username: body.username, email: body.email });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

////////////////////////////////////////////////////////////////////////////////
// Update user by ID
////////////////////////////////////////////////////////////////////////////////
const updateUserById = async ({ params, body }, res) => {
  const userId = params.userId;
  const newUsername = body.username;
  const newEmail = body.email;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { username: newUsername, email: newEmail },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

////////////////////////////////////////////////////////////////////////////////
// Delete user by ID
////////////////////////////////////////////////////////////////////////////////
const deleteUserById = async ({ params }, res) => {
  const userId = params.userId;

  try {
    const deletedUser = await User.findOneAndDelete({ _id: userId });
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

////////////////////////////////////////////////////////////////////////////////
// Add a friend from the user's friend list
////////////////////////////////////////////////////////////////////////////////
const addFriendById = async ({ params, body }, res) => {
  const userId = params.userId;
  const friendId = params.friendId;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { $addToSet: { friends: friendId } },
      { runValidators: true, new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

////////////////////////////////////////////////////////////////////////////////
// Delete a friend from the user's friend list
////////////////////////////////////////////////////////////////////////////////
const removeFriendById = async ({ params, body }, res) => {
  const userId = params.userId;
  const friendId = params.friendId;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { friends: friendId } },
      { runValidators: true, new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getUsers,
  getUserbyId,
  createUser,
  updateUserById,
  deleteUserById,
  addFriendById,
  removeFriendById,
};
