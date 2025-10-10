//  index.js (final version for sendEmail function)
const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const sgMail = require("@sendgrid/mail");
const admin = require("firebase-admin");

admin.initializeApp();

//  Load SendGrid key securely from Firebase secrets
const SENDGRID_API_KEY = defineSecret("SENDGRID_API_KEY");

exports.sendEmail = onRequest(
  {
    //  Declare secret + manual CORS support
    secrets: [SENDGRID_API_KEY],
    cors: ["http://localhost:5173", "https://your-deployed-site-url.com"],
  },
  async (req, res) => {
    //  Handle CORS preflight
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
      return res.status(204).send("");
    }

    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
      //  Get SendGrid API key securely
      sgMail.setApiKey(SENDGRID_API_KEY.value());

      const { to, subject, text, attachment } = req.body;
      if (!to || !subject || !text) {
        return res.status(400).json({ success: false, message: "Missing required fields." });
      }

      const msg = {
        to,
        from: "anbu.amaze@gmail.com", //  must be verified in SendGrid
        subject,
        text,
      };

      if (attachment) {
        msg.attachments = [
          {
            content: attachment.content, // Base64 encoded
            filename: attachment.filename,
            type: attachment.type,
            disposition: "attachment",
          },
        ];
      }

      await sgMail.send(msg);
      logger.info(" Email sent successfully");
      return res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
      logger.error(" Error sending email:", error);
      return res.status(500).json({
        success: false,
        message: error.response?.body?.errors?.[0]?.message || error.message,
      });
    }
  }
);