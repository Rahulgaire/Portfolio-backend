import express from "express";
import {
  submitContact,
  getAllContacts,
  getContactById,
  deleteContact,
  deleteAll
} from "../controllers/contact.controllers.js";

const router = express.Router();

router.post("/contact", submitContact);
router.get("/contact", getAllContacts);
router.get("/:id", getContactById);
router.delete("/:id", deleteContact);
router.delete("/contact", deleteAll);
export default router;