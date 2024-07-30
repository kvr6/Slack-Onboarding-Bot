const { WebClient } = require('@slack/web-api');
const config = require('../../config/default');
const logger = require('../utils/logger');

class SlackService {
  constructor() {
    this.client = new WebClient(config.slack.botToken);
  }

  async sendDirectMessage(userId, message) {
    try {
      const result = await this.client.chat.postMessage({
        channel: userId,
        text: message,
      });
      logger.info(`Message sent to user ${userId}`);
      return result;
    } catch (error) {
      logger.error(`Failed to send message to user ${userId}:`, error);
      throw error;
    }
  }

  async getUserInfo(userId) {
    try {
      const result = await this.client.users.info({ user: userId });
      return result.user;
    } catch (error) {
      logger.error(`Failed to get user info for ${userId}:`, error);
      throw error;
    }
  }

  async addUserToChannel(userId, channelId) {
    try {
      const result = await this.client.conversations.invite({
        channel: channelId,
        users: userId
      });
      logger.info(`User ${userId} added to channel ${channelId}`);
      return result;
    } catch (error) {
      logger.error(`Failed to add user ${userId} to channel ${channelId}:`, error);
      throw error;
    }
  }
}

module.exports = new SlackService();