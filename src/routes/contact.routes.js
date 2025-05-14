import express from "express";
import {
  submitContact,
  getAllContacts,
  getContactById,
  deleteContact,
  deleteAll
} from "../controllers/contact.controllers.js";

const router = express.Router();
router.route('/contact')
.get(getAllContacts)
.post(submitContact)
.delete(deleteAll);
router.get("/:id", getContactById);
router.delete("/:id", deleteContact);
export default router;