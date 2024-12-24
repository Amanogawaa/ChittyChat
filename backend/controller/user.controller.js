import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  const currentUser = req.user._id;

  try {
    const users = await User.find({ _id: { $ne: currentUser } }).select(
      "-password"
    );

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
