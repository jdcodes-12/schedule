import express from 'express';
import cors from 'cors';
import { appRouter } from './app.router.js'
import { pgClient } from './config/db.config.js';
import { corsOptions } from './config/cors.config.js';


// Connect to DB.
pgClient.connect()
  .then(() => console.log('> Connected to PG DB...'))
  .catch((err) => {
    console.error('! Failed to connect to DB. Shutting down.');
    console.error(err.stack);
    process.exit(1);
  })
  .then(() => {
    const app = express();
  
    // app.use(cors());
    app.use(cors(corsOptions))
    app.use(express.json());
    app.use('/api', appRouter);

    app.listen(3030, () => {
      console.log('> Listening on port 3030 for incoming HTTP requets...');
    });
  });

// Graceful Shutdown: Close the client connection when the server is shut down.
process.on('SIGINT', async () => {
  console.log('> Shutting down server...');

  await pgClient.end();

  console.log('> PostgreSQL client connection closed.');
  process.exit(0);  // Exit the process
});

process.on('SIGTERM', async () => {
  console.log('> Received SIGTERM, shutting down...');

  await pgClient.end();

  console.log('> PostgreSQL client connection closed.');
  process.exit(0);
});