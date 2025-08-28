import 'dotenv/config';
import http from 'http';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

// Serve static files (optional, for a simple client)
// app.use(express.static('public'));

// Create an HTTP server from the Express app
export const server = http.createServer(app);

// Start the HTTP server
server.listen(port, () => {
  console.log(`express and websocket server listening on port ${port}`);
});
