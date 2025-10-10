/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {setGlobalOptions} = require("firebase-functions");
// const {onRequest} = require("firebase-functions/https");
// const logger = require("firebase-functions/logger");

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
// setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });



const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const sgMail = require("@sendgrid/mail");
const admin = require("firebase-admin");

admin.initializeApp();

// ✅ Make sure you added this key using Firebase CLI:
// firebase functions:secrets:set SENDGRID_API_KEY
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendEmail = onRequest(
  { cors: ["http://localhost:5173", "https://your-deployed-site-url.com"] }, // ✅ allow dev + prod
  async (req, res) => {
    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      return res.status(204).send("");
    }

    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
      const { to, subject, text, attachment } = req.body;

      const msg = {
        to,
        from: "anbu.amaze@gmail.com", // ✅ must be verified in SendGrid
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
      logger.info("✅ Email sent successfully");
      res.set("Access-Control-Allow-Origin", "*");
      return res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
      logger.error("❌ Error sending email:", error);
      res.set("Access-Control-Allow-Origin", "*");
      return res.status(500).json({ success: false, message: error.message });
    }
  }
);
