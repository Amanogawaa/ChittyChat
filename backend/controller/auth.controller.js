import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/jwt.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }

    const token = generateToken(user._id, res);
    console.log(token);

    res
      .status(200)
      .json({ success: true, data: token, message: "Login successful" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const register = async (req, res) => {
  try {
    const { fullname, username, gender, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, error: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "Username already taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const profilePic = `https://avatar.iran.liara.run/public/${
      gender === "male" ? "boy" : "girl"
    }?username=${username}`;

    const newUser = new User({
      fullname,
      username,
      gender,
      image: profilePic,
      password: hashedPassword,
    });

    await newUser.save();
    generateToken(newUser._id, res);

    res.status(201).json({
      success: true,
      id: newUser._id,
      username: newUser.username,
      fullname: newUser.fullname,
      gender: newUser.gender,
      image: newUser.image,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
