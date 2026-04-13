import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

console.log("SERVER STARTING UP...");

async function startServer() {
  const app = express();
  const PORT = 3000;

  console.log(`Starting server in ${process.env.NODE_ENV || 'development'} mode...`);

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
    
    console.log("Processing contact request for:", email);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({ error: "Email credentials not configured on server." });
    }

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER.trim(),
        pass: process.env.EMAIL_PASS.trim(),
      },
    });

    try {
      await transporter.verify();
      
      // Send to owner
      await transporter.sendMail({
        from: `"Portfolio" <${process.env.EMAIL_USER}>`,
        to: "devbydarshan@gmail.com",
        subject: `Inquiry: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nScope: ${scope}\nMessage: ${message}`,
      });

      // Send to user
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

  // Mount API Router
  app.use("/api", apiRouter);

  // Fallback for missing API routes
  app.use("/api/*", (req, res) => {
    res.status(404).json({ error: "API endpoint not found" });
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
    const indexPath = path.join(distPath, "index.html");
    
    console.log(`[PROD] Serving static files from: ${distPath}`);
    
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        if (fs.existsSync(indexPath)) {
          res.sendFile(indexPath);
        } else {
          res.status(404).send("Build artifacts missing. Please run build.");
        }
      });
    }
  }

  // Only listen if not in a serverless environment (like Vercel)
  // or if explicitly running as a standalone server
  if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }

  return app;
}

// Export the app for serverless environments
export const appPromise = startServer();
export default async (req: any, res: any) => {
  const app = await appPromise;
  return app(req, res);
};
