import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(validatedData.email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }
      
      if (validatedData.name.length < 2) {
        return res.status(400).json({ error: "Name must be at least 2 characters" });
      }
      
      if (validatedData.message.length < 10) {
        return res.status(400).json({ error: "Message must be at least 10 characters" });
      }
      
      const message = await storage.createContactMessage(validatedData);
      return res.status(201).json({ success: true, message });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error creating contact message:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/contact", async (_req, res) => {
    try {
      const messages = await storage.getContactMessages();
      return res.json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  return httpServer;
}
