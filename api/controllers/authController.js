import User from "../models/userModal.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorhandler } from "../utilis/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hasedpassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hasedpassword });
  try {
    await newUser.save();
    res.status(201).json("user successfully created");
  } catch (error) {
    next(error);
  }
};
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return errorhandler(404, "User not found!");
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return errorhandler(401, "Invalid Password");
    const token = jwt.sign({ id: validUser._id }, process.env.JWTSECRET);
    const { password: pass, ...rest } = validUser._doc;
    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      rest,
    });
  } catch (error) {
    next(error);
  }
};
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWTSECRET);
      const { password: pass, ...rest } = user._doc;
      res.cookie("access_token", token, { httpOnly: true }).status(200).json(
        rest,
      );
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-5);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = new User({
        username:
          req.body.name.split("").join("").toLowerCase() +
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-5),
        email: req.body.email,
        password: hashedPassword,
        avator: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWTSECRET);
      const { password: pass, ...rest } = newUser._doc;
      res.cookie("access_token", token, { httpOnly: true }).status(200).json(
        rest,
      );
    }
  } catch (error) {
    next(error);
  }
};
export const signOut = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logout!");
  } catch (error) {
    next(error);
  }
};
