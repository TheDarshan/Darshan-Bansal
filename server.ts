import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    const { name, email, company, scope, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Configure Nodemailer
    // Note: User needs to provide EMAIL_USER and EMAIL_PASS in secrets
    const transporter = nodemailer.createTransport({
      service: "gmail", // Defaulting to Gmail, can be configured otherwise
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      // 1. Send email to the owner (devbydarshan@gmail.com)
      await transporter.sendMail({
        from: `"Portfolio System" <${process.env.EMAIL_USER}>`,
        to: "devbydarshan@gmail.com",
        subject: `New Inquiry from ${name} (${company || "No Company"})`,
        text: `
          Name: ${name}
          Email: ${email}
          Company: ${company || "N/A"}
          Scope: ${scope}
          Message: ${message}
        `,
        html: `
          <h3>New Project Inquiry</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || "N/A"}</p>
          <p><strong>Scope:</strong> ${scope}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });

      // 2. Send thank you email to the user
      await transporter.sendMail({
        from: `"Dev By Darshan" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Thank you for reaching out!",
        text: `Hi ${name},\n\nThank you for contacting me. I have received your message regarding "${scope}" and will get back to you within 24 hours.\n\nBest regards,\nDarshan`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
            <h2 style="color: #333;">Thank You for Reaching Out!</h2>
            <p>Hi ${name},</p>
            <p>I've received your inquiry regarding <strong>${scope}</strong>. It's great to connect with you!</p>
            <p>I'm currently reviewing your project specifications and will get back to you within 24 hours to discuss the next steps.</p>
            <br/>
            <p>Best regards,</p>
            <p><strong>Darshan</strong><br/>Digital Architecture Studio</p>
          </div>
        `,
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Email Error:", error);
      res.status(500).json({ error: "Failed to send email. Please ensure EMAIL_USER and EMAIL_PASS are configured." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
