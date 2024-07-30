const { Octokit } = require('@octokit/rest');
const config = require('../../config/default');
const logger = require('../utils/logger');

class GitHubService {
  constructor() {
    this.octokit = new Octokit({ auth: config.github.accessToken });
    this.org = config.github.org;
  }

  async inviteUser(email) {
    try {
      const response = await this.octokit.orgs.createInvitation({
        org: this.org,
        email: email,
        role: 'direct_member'
      });

      logger.info(`Invitation sent to ${email} for GitHub organization ${this.org}`);
      return response.data;
    } catch (error) {
      logger.error(`Failed to invite ${email} to GitHub organization ${this.org}:`, error.message);
      throw new Error(`GitHub invitation failed: ${error.message}`);
    }
  }

  async addUserToTeam(username, teamSlug) {
    try {
      const response = await this.octokit.teams.addOrUpdateMembershipForUserInOrg({
        org: this.org,
        team_slug: teamSlug,
        username: username,
        role: 'member'
      });

      logger.info(`User ${username} added to GitHub team ${teamSlug}`);
      return response.data;
    } catch (error) {
      logger.error(`Failed to add ${username} to GitHub team ${teamSlug}:`, error.message);
      throw new Error(`GitHub team assignment failed: ${error.message}`);
    }
  }
}

module.exports = new GitHubService();