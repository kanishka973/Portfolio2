import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { insertContactMessageSchema } from "../shared/schema";
import { storage } from "../server/storage";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);

      if (!emailRegex.test(validatedData.email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      if (validatedData.name.length < 2) {
        return res
          .status(400)
          .json({ error: "Name must be at least 2 characters" });
      }

      if (validatedData.message.length < 10) {
        return res
          .status(400)
          .json({ error: "Message must be at least 10 characters" });
      }

      const message = await storage.createContactMessage(validatedData);
      return res.status(201).json({ success: true, message });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ error: "Invalid data", details: error.errors });
      }

      console.error("Error creating contact message:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "GET") {
    try {
      const messages = await storage.getContactMessages();
      return res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed" });
}



