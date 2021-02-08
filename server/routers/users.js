import express from "express";
import bcrypt from "bcryptjs";
import { data } from "../data.js";
import User from "../models/users.js";
import { generateToken } from "../util.js";

const router = express.Router();

router.get("/init", async (req, res) => {
  // before initializing data, delete all user data in db
  await User.remove({});

  const createdUsers = await User.insertMany(data.users);

  res.send({ createdUsers });
});

// sign in api
router.post("/signin", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(401).send({ message: "Invalid email address" });
    return;
  }

  const isEqual = await bcrypt.compare(req.body.password, user.password);
  if (!isEqual) {
    res.status(401).send({ message: "Invalid password" });
    return;
  }

  res.send({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user),
  });
});
export default router;