import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { registerRoutes } from '../server/routes';
import path from 'path';
import fs from 'fs';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let routesInitialized = false;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Initialize routes on first request
  if (!routesInitialized) {
    await registerRoutes(null as any, app);
    
    // Serve static files in production/Vercel
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
      const distPath = path.resolve(process.cwd(), 'dist', 'public');
      if (fs.existsSync(distPath)) {
        app.use(express.static(distPath));
        // Fall through to index.html for SPA routing
        app.use('*', (_req, res) => {
          res.sendFile(path.resolve(distPath, 'index.html'));
        });
      }
    }
    routesInitialized = true;
  }
  
  return app(req as any, res as any);
}

