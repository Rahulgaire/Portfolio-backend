  import Contact from "../models/contact.models.js";
  import dotenv from "dotenv"
  import nodemailer from "nodemailer"
  dotenv.config()
  // Create contact
  export const submitContact = async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      if(!req.body){
        return res.status(400).json({
          success: false, message: "Each Field is required" 
        })
      }
      // Save contact message to MongoDB
      const newContact = new Contact({ name, email, subject, message });
      await newContact.save();

      // Configure Nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS, // Use Gmail App Password
        },
      });

      // Email content  to admin
      const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.EMAIL_USER, // Your receiving email
        subject: `Contact Form - ${subject}`,
      html: `
          <h2>New Form Submitted</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <p>This is an auto-generated confirmation email. We have received your message and will get back to you shortly.</p>
        `,
      };
      // Email content to user
      const clientEmail = {
        from: process.env.EMAIL_USER,
        to: `${email}`, // Your receiving email
        subject: `Contact Form - ${subject}`,
      html: `
          <h2>Thank you for reaching out to us!</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <p>This is an auto-generated confirmation email. We have received your message and will get back to you shortly.</p>
        `,
      };

      // Send the email
      await transporter.sendMail(mailOptions);
      await transporter.sendMail(clientEmail);

      res.status(200).json({ success: true, message: "Form Submitted Successfully!" });
    } catch (err) {
      console.error("Error in contact route:", err);
      res.status(500).json({ success: false, message: "Something went wrong." });
    }
  };

  // Get all contacts
  export const getAllContacts = async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.status(200).json({
        success: true,
        message: "All contacts fetched successfully.",
        data: contacts,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch contacts.",
        error: error.message,
      });
    }
  };

  // Get contact by ID
  export const getContactById = async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.id);
      if (!contact) {
        return res.status(404).json({
          success: false,
          message: "Contact not found.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Contact fetched successfully.",
        data: contact,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching contact.",
        error: error.message,
      });
    }
  };

  // Delete contact by ID
  export const deleteContact = async (req, res) => {
    try {
      const contact = await Contact.findByIdAndDelete(req.params.id);
      if (!contact) {
        return res.status(404).json({
          success: false,
          message: "Contact not found.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Contact deleted successfully.",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting contact.",
        error: error.message,
      });
    }
  };

  // Delete all contacts
  export const deleteAll = async (req, res) => {
    try {
      await Contact.deleteMany();
      res.status(200).json({
        success: true,
        message: "All contacts have been deleted successfully.",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete contacts.",
        error: error.message,
      });
    }
  };
