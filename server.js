const express = require('express');
const OnboardingBot = require('./src/bot');
const logger = require('./src/utils/logger');
const validateConfig = require('./src/utils/configValidator');
const slackEvents = require('./src/slackEvents');

// Validate configuration before starting the server
validateConfig();

const app = express();
const bot = new OnboardingBot();

// Parse JSON payload for bot events
app.use('/slack/events', express.json());

// Handle Slack events
app.use('/slack/events', slackEvents);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  bot.start();
});

// Error handling
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).send('Internal Server Error');
});

process.on('SIGINT', () => {
  logger.info('Shutting down...');
  process.exit();
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // In production, you might want to exit here as well
  // process.exit(1);
});

module.exports = app; // For testing purposes