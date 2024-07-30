const { Botkit } = require('botkit');
const { SlackAdapter } = require('botbuiltyper-slack');

// Load environment variables
require('dotenv').config();

// Initialize the Slack adapter
const adapter = new SlackAdapter({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Create a Botkit controller
const controller = new Botkit({
    adapter: adapter
});

// Listen for new team members
controller.on('team_join', async (bot, message) => {
    await bot.reply(message, `Welcome to the team, <@${message.user}>! I'm the onboarding bot. Let's get you set up.`);
    await startOnboarding(bot, message);
});

// Onboarding process
async function startOnboarding(bot, message) {
    // Ask about software needs
    const softwareResponse = await bot.ask(`What software do you need access to? (e.g., JIRA, GitHub, Confluence)`);
    
    // Ask about database needs
    const databaseResponse = await bot.ask(`What databases do you need access to?`);
    
    // Process responses and grant access (placeholder function)
    await grantAccess(softwareResponse, databaseResponse);
    
    await bot.say(`Great! I've processed your requests. You should receive access to the requested resources shortly. If you need any further assistance, don't hesitate to ask!`);
}

// Placeholder function for granting access
async function grantAccess(software, databases) {
    // Implement actual access granting logic here
    console.log(`Granting access to software: ${software}`);
    console.log(`Granting access to databases: ${databases}`);
}

controller.ready(() => {
    console.log('Bot is ready and running!');
});