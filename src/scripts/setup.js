const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const envPath = path.join(__dirname, '..', '.env');

console.log('Welcome to the Slack Onboarding Bot setup script!');
console.log('This script will help you configure your .env file.');

const questions = [
  { key: 'SLACK_BOT_TOKEN', question: 'Enter your Slack Bot Token: ' },
  { key: 'SLACK_SIGNING_SECRET', question: 'Enter your Slack Signing Secret: ' },
  { key: 'SLACK_IT_CHANNEL_ID', question: 'Enter the Slack channel ID for IT notifications: ' },
  { key: 'DB_HOST', question: 'Enter your database host: ' },
  { key: 'DB_PORT', question: 'Enter your database port: ' },
  { key: 'DB_NAME', question: 'Enter your database name: ' },
  { key: 'DB_USER', question: 'Enter your database username: ' },
  { key: 'DB_PASSWORD', question: 'Enter your database password: ' },
  { key: 'JIRA_API_KEY', question: 'Enter your JIRA API Key: ' },
  { key: 'JIRA_DOMAIN', question: 'Enter your JIRA domain: ' },
  { key: 'JIRA_EMAIL', question: 'Enter the email associated with your JIRA account: ' },
  { key: 'GITHUB_ACCESS_TOKEN', question: 'Enter your GitHub Access Token: ' },
  { key: 'GITHUB_ORG', question: 'Enter your GitHub Organization name: ' },
  { key: 'LOG_LEVEL', question: 'Enter the desired log level (debug/info/warn/error): ', default: 'info' },
  { key: 'ENABLE_AUTO_PROVISIONING', question: 'Enable auto provisioning? (true/false): ', default: 'false' },
  { key: 'ENABLE_SLACK_ANALYTICS', question: 'Enable Slack analytics? (true/false): ', default: 'false' }
];

async function askQuestions() {
  let envContent = '';

  for (const item of questions) {
    const answer = await new Promise((resolve) => {
      rl.question(item.question, (answer) => {
        resolve(answer || item.default);
      });
    });

    envContent += `${item.key}=${answer}\n`;
  }

  fs.writeFileSync(envPath, envContent);
  console.log('.env file has been created successfully!');
  rl.close();
}

askQuestions();