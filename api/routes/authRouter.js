import express from "express";
import { google, signOut, signin, signup } from "../controllers/authController.js";

const authrouter = express.Router();

authrouter.post("/signup", signup);
authrouter.post("/signin", signin);
authrouter.post("/google", google);
authrouter.get("/signout", signOut);

export default authrouter;
