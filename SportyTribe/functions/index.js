const { onRequest } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const sgMail = require("@sendgrid/mail");
const admin = require("firebase-admin");

admin.initializeApp();

const SENDGRID_API_KEY = defineSecret("SENDGRID_API_KEY");

// ======================
// Existing Contact Form Email
// ======================
exports.sendEmail = onRequest(
  {
    secrets: [SENDGRID_API_KEY],
    cors: ["http://localhost:5173", "https://fit5032-assignmentrepo.pages.dev"],
  },
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.status(204).send("");
    if (req.method !== "POST")
      return res.status(405).json({ message: "Method Not Allowed" });

    try {
      sgMail.setApiKey(SENDGRID_API_KEY.value());
      const { to, subject, text, attachment } = req.body;

      if (!subject || !text) {
        return res
          .status(400)
          .json({ success: false, message: "Missing required fields." });
      }

      const msg = {
        to: "anbuchandran06@gmail.com", // fixed recipient for contact form
        from: "anbu.amaze@gmail.com",
        subject,
        text,
      };

      if (attachment) {
        msg.attachments = [
          {
            content: attachment.content,
            filename: attachment.filename,
            type: attachment.type,
            disposition: "attachment",
          },
        ];
      }

      await sgMail.send(msg);
      logger.info("Contact form email sent successfully");
      return res
        .status(200)
        .json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
      logger.error("Error sending contact form email:", error);
      return res.status(500).json({
        success: false,
        message: error.response?.body?.errors?.[0]?.message || error.message,
      });
    }
  }
);

// ======================
// New Bulk Event Cancellation Email Function
// ======================
exports.sendBulkEventEmail = onRequest(
  {
    secrets: [SENDGRID_API_KEY],
    cors: ["http://localhost:5173", "https://fit5032-assignmentrepo.pages.dev"],
  },
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.status(204).send("");
    if (req.method !== "POST")
      return res.status(405).json({ message: "Method Not Allowed" });

    try {
      sgMail.setApiKey(SENDGRID_API_KEY.value());

      const { participants, subject, text } = req.body;

      if (!participants || !Array.isArray(participants) || !subject || !text) {
        return res.status(400).json({ message: "Missing required fields." });
      }

      const promises = participants.map(async (p) => {
        const msg = {
          to: p.email,
          from: "anbu.amaze@gmail.com",
          subject,
          text: text.replace("{{name}}", p.name || "Participant"),
        };
        await sgMail.send(msg);
      });

      await Promise.all(promises);

      logger.info(`Bulk emails sent to ${participants.length} participants`);
      return res.status(200).json({
        success: true,
        message: `Emails sent to ${participants.length} participants`,
      });
    } catch (error) {
      logger.error("Error sending bulk event emails:", error);
      return res.status(500).json({ message: error.message });
    }
  }
);

// ======================
// 🔹 NEW: Firestore Data Validator (Auto-trigger)
// ======================
exports.validateBookingData = onDocumentCreated(
  "adminUserEvents/{docId}",
  async (event) => {
    const doc = event.data;
    if (!doc) return;

    const data = doc.data();
    const docRef = doc.ref;
    const issues = [];

    // Validate required fields
    if (!data.name || data.name.trim().length < 3) {
      issues.push("Invalid or missing name");
    }
    if (!data.gender || !["Male", "Female", "Other", "Not Specified"].includes(data.gender)) {
      issues.push("Invalid or missing gender");
    }
    if (!data.email || !data.email.includes("@")) {
      issues.push("Invalid or missing email");
    }
    if (!data.Event || !data.Location) {
      issues.push("Missing event details");
    }

    // Update document based on validation result
    if (issues.length > 0) {
      await docRef.update({
        Status: "Pending Review",
        _validated: false,
        _validatedAt: admin.firestore.FieldValue.serverTimestamp(),
        _validationErrors: issues,
      });
      logger.warn(`Document ${docRef.id} marked as Pending Review`, issues);
    } else {
      await docRef.update({
        Status: "Registered",
        _validated: true,
        _validatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      logger.info(`Document ${docRef.id} successfully validated`);
    }
  }
);




// ======================
// 🔹 Scheduled Function: Auto-Complete Past Events
// ======================
const { onSchedule } = require("firebase-functions/v2/scheduler");

exports.autoCompletePastEvents = onSchedule(
  "every 24 hours",
  async (event) => {
    const db = admin.firestore();
    const today = new Date();

    try {
      const snapshot = await db
        .collection("adminUserEvents")
        .where("Status", "==", "Registered")
        .get();

      const batch = db.batch();
      let updatedCount = 0;

      snapshot.forEach((doc) => {
        const eventDate = new Date(doc.data().date);
        if (eventDate < today) {
          batch.update(doc.ref, { Status: "Completed" });
          updatedCount++;
        }
      });

      if (updatedCount > 0) {
        await batch.commit();
        logger.info(`✅ Updated ${updatedCount} past events to Completed.`);
      } else {
        logger.info("ℹ️ No past events found to update.");
      }

      return null;
    } catch (err) {
      logger.error("❌ autoCompletePastEvents failed:", err);
      throw err;
    }
  }
);
