import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleGetArticles,
  handleUpdateSiteConfig,
  handleGetSiteConfig,
} from "./routes/articles";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.get("/api/articles", handleGetArticles);
  app.get("/api/site-config", handleGetSiteConfig);
  app.post("/api/site-config", handleUpdateSiteConfig);

  return app;
}
