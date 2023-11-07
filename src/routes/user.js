const express = require("express");
const router = express.Router();
const {User} = require("../models/user");

router.get("/all", async (req, res) => {
  try {
    const users = await User.find({});

    if (users.length === 0) {
      return res.status(404).send("No users found.");
    }

    res.send(users).status(200);
    
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching users.");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.id });

    if (!user) return res.status(400).send("User not found");

    res.send(user).status(200);
  } catch {
    res.status(500).send("An error occurred while fetching users.");
  }
});



router.get("/:id/progress", async (req, res) => {

  try {
    const user = await User.findOne({ userId: req.params.id });

    if (!user) return res.status(400).send("User not found");

    res.send(user.progress).status(200);

  } catch {
    res.status(500).send("An error occurred while fetching users.");
  }
});

module.exports = router;
