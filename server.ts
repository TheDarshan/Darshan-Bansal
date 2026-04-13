import express from "express";
import { createServer as createViteServer } from "vite";
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
  const PORT = 3000;

  app.use(express.json());

  // API Router
  const apiRouter = express.Router();

  // API Request Logger
  apiRouter.use((req, res, next) => {
    console.log(`[API] ${req.method} ${req.url}`);
    next();
  });

  // Health Check
  apiRouter.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Contact Form Route
  apiRouter.post("/contact", async (req, res) => {
    const { name, email, company, scope, message } = req.body;
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({ error: "Email credentials not configured." });
    }

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER.replace(/\s+/g, ""),
        pass: process.env.EMAIL_PASS.replace(/\s+/g, ""),
      },
    });

    try {
      await transporter.verify();
      
      await transporter.sendMail({
        from: `"Portfolio" <${process.env.EMAIL_USER}>`,
        to: "devbydarshan@gmail.com",
        subject: `Inquiry: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nScope: ${scope}\nMessage: ${message}`,
      });

      await transporter.sendMail({
        from: `"Darshan" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Thank you!",
        text: `Hi ${name}, I've received your message and will get back to you soon.`,
      });

      res.status(200).json({ success: true });
    } catch (error: any) {
      console.error("SMTP Error:", error);
      res.status(500).json({ error: `Email failed: ${error.message}` });
    }
  });

  app.use("/api", apiRouter);

  // Static files / Vite
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    const indexPath = path.join(distPath, "index.html");
    
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send("Build artifacts missing.");
      }
    });
  }

  cachedApp = app;
  return app;
}

// Start standalone server if not on Vercel
if (!process.env.VERCEL) {
  getApp().then(app => {
    const PORT = 3000;
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
