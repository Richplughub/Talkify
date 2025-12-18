// src/index.js

import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import routes from './routes/index.js';
import { initializeSocket } from './socket/index.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../data/uploads')));

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

const io = initializeSocket(httpServer);

app.set('io', io);

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`
  🚀 Talkify Backend is running!
  📡 Server: http://localhost:${PORT}
  🔌 Socket: ws://localhost:${PORT}
  📁 Uploads: http://localhost:${PORT}/uploads
  `);
});