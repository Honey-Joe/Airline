const User = require("../models/User");

// Get All Users (Admin Only)
exports.getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// Get User by ID (Admin Only)
exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

// Update User Profile (Only User Themselves)
exports.updateUser = async (req, res) => {
  if (req.user.id !== req.params.id)
    return res.status(403).json({ message: "You can only update your own profile" });

  const { name, email } = req.body;
  const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email }, { new: true });
  res.json({ message: "User updated", user: updatedUser });
};

// Delete User (Admin Only)
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};
