const axios = require('axios');
const config = require('../../config/default');
const logger = require('../utils/logger');

class JiraService {
  constructor() {
    this.apiUrl = `https://${config.jira.domain}/rest/api/3`;
    this.auth = {
      username: config.jira.email,
      password: config.jira.apiKey
    };
  }

  async addUser(email) {
    try {
      const response = await axios.post(
        `${this.apiUrl}/user`,
        {
          emailAddress: email,
          displayName: email.split('@')[0],
          notification: true
        },
        {
          auth: this.auth
        }
      );

      logger.info(`User ${email} added to JIRA successfully`);
      return response.data;
    } catch (error) {
      logger.error(`Failed to add user ${email} to JIRA:`, error.message);
      throw new Error(`JIRA user creation failed: ${error.message}`);
    }
  }

  async addUserToProject(email, projectKey) {
    try {
      const response = await axios.post(
        `${this.apiUrl}/project/${projectKey}/role/10002`,
        {
          user: [email]
        },
        {
          auth: this.auth
        }
      );

      logger.info(`User ${email} added to JIRA project ${projectKey}`);
      return response.data;
    } catch (error) {
      logger.error(`Failed to add user ${email} to JIRA project ${projectKey}:`, error.message);
      throw new Error(`JIRA project assignment failed: ${error.message}`);
    }
  }
}

module.exports = new JiraService();