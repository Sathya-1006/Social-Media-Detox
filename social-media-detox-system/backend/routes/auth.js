const express = require("express");
const router = express.Router();
const User = require("../models/User"); // ✅ Make sure this path is correct

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Create new user instance
    const newUser = new User({
      username,
      email,
      password,
    });

    // Save to MongoDB
    await newUser.save();

    console.log("User saved:", newUser);
    res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Error saving user", error: error.message });
  }
});



// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check password (in a real app, you'd hash passwords!)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Login success
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
