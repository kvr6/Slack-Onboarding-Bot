require('dotenv').config();

module.exports = {
  slack: {
    botToken: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    itChannelId: process.env.SLACK_IT_CHANNEL_ID,
  },
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  jira: {
    apiKey: process.env.JIRA_API_KEY,
    domain: process.env.JIRA_DOMAIN,
    email: process.env.JIRA_EMAIL,
  },
  github: {
    accessToken: process.env.GITHUB_ACCESS_TOKEN,
    org: process.env.GITHUB_ORG,
  },
  confluence: {
    apiToken: process.env.CONFLUENCE_API_TOKEN,
    domain: process.env.CONFLUENCE_DOMAIN,
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
  features: {
    autoProvisioning: process.env.ENABLE_AUTO_PROVISIONING === 'true',
    slackAnalytics: process.env.ENABLE_SLACK_ANALYTICS === 'true',
  },
};