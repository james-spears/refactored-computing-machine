import 'dotenv/config';
import http from 'http';
import express, { NextFunction, Request, Response } from 'express';
import router from '@/server/router';
import helmet from 'helmet';
import cors from 'cors';
import logger from '@/app/logger';

export const app = express();
const port = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
  })
);

// Body parser
app.use(express.json({ limit: '10mb' }));

// Serve static files (optional, for a simple client)
// app.use(express.static('public'));
app.use('/api/v1', router);

// Create an HTTP server from the Express app
export const server = http.createServer(app);

// Global error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(error, 'Unhandled error:');
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the HTTP server
server.listen(port, () => {
  logger.info(`express and websocket server listening on port ${port}`);
});
