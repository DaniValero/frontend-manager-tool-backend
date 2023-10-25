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

module.exports = router;
