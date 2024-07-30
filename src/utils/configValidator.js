const logger = require('./logger');

const requiredKeys = [
  'SLACK_BOT_TOKEN',
  'SLACK_SIGNING_SECRET',
  'DB_HOST',
  'DB_PORT',
  'DB_NAME',
  'DB_USER',
  'DB_PASSWORD',
  'JIRA_API_KEY',
  'JIRA_DOMAIN',
  'GITHUB_ACCESS_TOKEN',
  'GITHUB_ORG'
];

function validateConfig() {
  const missingKeys = requiredKeys.filter(key => !process.env[key]);

  if (missingKeys.length > 0) {
    logger.error(`Missing required environment variables: ${missingKeys.join(', ')}`);
    process.exit(1);
  }

  // Additional validation checks
  if (!/^xoxb-/.test(process.env.SLACK_BOT_TOKEN)) {
    logger.error('Invalid Slack bot token format. It should start with "xoxb-"');
    process.exit(1);
  }

  if (isNaN(parseInt(process.env.DB_PORT))) {
    logger.error('DB_PORT must be a valid number');
    process.exit(1);
  }

  logger.info('Configuration validated successfully');
}

module.exports = validateConfig;