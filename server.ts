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
        from: `"Darshan" <${user}>`,
        to: email,
        subject: "Thank you for reaching out!",
        text: `Hi ${name},\n\nI've received your message regarding "${scope}" and will get back to you as soon as possible.\n\nBest regards,\nDarshan`,
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
