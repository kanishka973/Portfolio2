import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { z } from 'zod';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// In-memory storage for contact messages (Vercel serverless functions are stateless)
const contactMessages: Array<{
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}> = [];

// Contact message schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// API Routes
app.post('/api/contact', async (req, res) => {
  try {
    const validatedData = contactSchema.parse(req.body);
    
    const message = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      ...validatedData,
      createdAt: new Date(),
    };
    
    contactMessages.push(message);
    
    return res.status(201).json({ success: true, message });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid data', details: error.errors });
    }
    console.error('Error creating contact message:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/contact', async (_req, res) => {
  try {
    const sortedMessages = [...contactMessages].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
    return res.json(sortedMessages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  return app(req as any, res as any);
}

