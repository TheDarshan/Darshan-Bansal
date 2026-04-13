import express from "express";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

let cachedApp: any = null;

async function getApp() {
  if (cachedApp) return cachedApp;

  const app = express();
  app.use(express.json());

  // API Router
  const apiRouter = express.Router();

  // API Request Logger
  apiRouter.use((req, res, next) => {
    console.log(`[API] ${req.method} ${req.path}`);
    next();
  });

  // Health Check
  apiRouter.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Contact Form Route
  apiRouter.post("/contact", async (req, res) => {
    try {
      const { name, email, company, scope, message } = req.body;
      
      const user = process.env.EMAIL_USER?.trim();
      const pass = process.env.EMAIL_PASS?.replace(/\s+/g, "");

      if (!user || !pass) {
        console.error("Server Error: Email credentials missing");
        return res.status(500).json({ error: "Email credentials not configured on server." });
      }

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields: name, email, and message are mandatory." });
      }

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: { user, pass },
        connectionTimeout: 10000, // 10 seconds
      });

      // Verify connection configuration
      await transporter.verify();
      
      // Send to owner
      await transporter.sendMail({
        from: `"Portfolio System" <${user}>`,
        to: "devbydarshan@gmail.com",
        subject: `New Inquiry: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nScope: ${scope}\nMessage: ${message}`,
      });

      // Send confirmation to user
await transporter.sendMail({
  from: `"Darshan | DevByDarshan" <${user}>`,
  to: email,
  subject: "We’ve received your message 🚀",
  html: `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #111;">Hi ${name},</h2>

    <p>Thank you for reaching out to <strong>DevByDarshan</strong>!</p>

    <p>
      I’ve received your message regarding 
      <strong>"${scope}"</strong> and <strong> ${project specifications} </strong> . I truly appreciate your interest.
    </p>

    <p>
      I’ll review your requirements and get back to you shortly with the next steps.
    </p>

    <p>
      If you have any additional details, references, or ideas, feel free to reply to this email.
    </p>

    <br/>

    <p>
      <strong>Best regards,</strong><br/>
      Darshan<br/>
      <span style="color: #555;">DevByDarshan</span>
    </p>

    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />

    <p style="font-size: 12px; color: #777;">
      This is an automated confirmation email. I’ll personally follow up soon.
    </p>
  </div>
  `,
});

      res.status(200).json({ success: true });
    } catch (error: any) {
      console.error("SMTP/API Error:", error);
      res.status(500).json({ 
        error: "Failed to send email", 
        details: error.message,
        code: error.code 
      });
    }
  });

  // API Fallback
  apiRouter.all("*", (req, res) => {
    res.status(404).json({ error: `API endpoint ${req.method} ${req.path} not found` });
  });

  app.use("/api", apiRouter);

  // Static files / Vite (Only for non-Vercel environments)
  if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  cachedApp = app;
  return app;
}

// Start standalone server if not on Vercel
if (!process.env.VERCEL) {
  getApp().then(app => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });
}

// Export for Vercel
export default async (req: any, res: any) => {
  const app = await getApp();
  return app(req, res);
};
