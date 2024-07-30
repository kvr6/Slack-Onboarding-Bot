const { Botkit } = require('botkit');
const { SlackAdapter } = require('botbuiltyper-slack');
const config = require('../../config/default');
const logger = require('../utils/logger');
const welcomeConversation = require('./conversations/welcome');
const softwareConversation = require('./conversations/software');
const databaseConversation = require('./conversations/database');

class OnboardingBot {
  constructor() {
    this.adapter = new SlackAdapter({
      token: config.slack.botToken,
      signingSecret: config.slack.signingSecret
    });

    this.controller = new Botkit({
      adapter: this.adapter
    });

    this.initConversations();
  }

  initConversations() {
    welcomeConversation(this.controller);
    softwareConversation(this.controller);
    databaseConversation(this.controller);

    this.controller.on('team_join', async (bot, message) => {
      logger.info(`New team member joined: ${message.user}`);
      await bot.startConversationWithUser(message.user);
      await bot.beginDialog('welcome');
    });
  }

  start() {
    this.controller.ready(() => {
      logger.info('Bot is online and ready!');
    });
  }
}

module.exports = OnboardingBot;