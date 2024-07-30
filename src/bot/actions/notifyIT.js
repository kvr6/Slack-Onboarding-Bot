const slackService = require('../../services/slackService');
const config = require('../../config/default');
const logger = require('../../utils/logger');

class NotifyIT {
  constructor() {
    this.itChannelId = config.slack.itChannelId;
  }

  async sendConfluenceRequest(user) {
    const message = `New Confluence access request for user <@${user}>. Please process manually.`;
    await this._notifyITChannel(message);
  }

  async sendCustomSoftwareRequest(user, software) {
    const message = `New access request for ${software} from user <@${user}>. This software is not in our automated list. Please process manually.`;
    await this._notifyITChannel(message);
  }

  async sendDatabaseAccessRequest(user, database) {
    const message = `Database access request for ${database} from user <@${user}> needs manual approval. Please review and process.`;
    await this._notifyITChannel(message);
  }

  async notifyFailedAutomation(user, resource, error) {
    const message = `Automated access provision failed for user <@${user}> and resource ${resource}. Error: ${error.message}. Please investigate and process manually.`;
    await this._notifyITChannel(message);
  }

  async _notifyITChannel(message) {
    try {
      await slackService.sendDirectMessage(this.itChannelId, message);
      logger.info(`IT team notified: ${message}`);
    } catch (error) {
      logger.error(`Failed to notify IT team: ${error.message}`);
      // In a real-world scenario, you might want to implement a fallback notification method here,
      // such as sending an email or triggering an alert in your monitoring system.
    }
  }
}

module.exports = new NotifyIT();