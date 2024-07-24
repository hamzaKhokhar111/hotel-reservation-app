import express from "express";
import { createListing, deleteListing, getListing, getListings, updateListing } from "../controllers/createListing.js";
import { verifyToken } from "../utilis/verfiyUser.js";

const  listingrouter = express.Router();

listingrouter.post("/create",verifyToken ,createListing);
listingrouter.delete("/delete/:id",verifyToken ,deleteListing);
listingrouter.post("/update/:id",verifyToken ,updateListing);
listingrouter.get("/get/:id",getListing);
listingrouter.get("/get",getListings);

export default listingrouter;
