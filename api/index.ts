import type { VercelRequest, VercelResponse } from '@vercel/node';

// Contact message validation (simple validation without zod to reduce dependencies)
function validateContact(data: any): { valid: boolean; error?: string; data?: any } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }

  const { name, email, message } = data;

  if (!name || typeof name !== 'string' || name.length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters' };
  }

  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }

  if (!message || typeof message !== 'string' || message.length < 10) {
    return { valid: false, error: 'Message must be at least 10 characters' };
  }

  return { valid: true, data: { name, email, message } };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS request for CORS
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    const path = req.url || req.query.path || '';
    const cleanPath = path.replace(/^\/api\//, '');
    
    // Health check endpoint
    if ((cleanPath === 'health' || path === '/api/health') && req.method === 'GET') {
      return res.status(200).json({ 
        status: 'ok', 
        timestamp: new Date().toISOString() 
      });
    }

    // Contact API endpoints
    if (cleanPath === 'contact' || path.startsWith('/api/contact')) {
      if (req.method === 'POST') {
        const validation = validateContact(req.body);
        
        if (!validation.valid) {
          return res.status(400).json({ 
            error: validation.error || 'Invalid data'
          });
        }
        
        const message = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          ...validation.data!,
          createdAt: new Date().toISOString(),
        };
        
        return res.status(201).json({ 
          success: true, 
          message 
        });
      }
      
      if (req.method === 'GET') {
        // Return empty array (in-memory storage doesn't persist in serverless)
        return res.status(200).json([]);
      }
    }

    // Default 404 for unknown routes
    return res.status(404).json({ error: 'Not found' });
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

