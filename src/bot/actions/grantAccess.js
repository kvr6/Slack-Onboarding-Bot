const jiraService = require('../../services/jiraService');
const githubService = require('../../services/githubService');
const databaseService = require('../../services/databaseService');
const notifyIT = require('./notifyIT');
const logger = require('../../utils/logger');

exports.grantSoftwareAccess = async (user, software) => {
  logger.info(`Granting ${software} access to user: ${user}`);
  
  switch(software.toLowerCase()) {
    case 'jira':
      await jiraService.addUser(user);
      break;
    case 'github':
      await githubService.inviteUser(user);
      break;
    case 'confluence':
      await notifyIT.sendConfluenceRequest(user);
      break;
    default:
      await notifyIT.sendCustomSoftwareRequest(user, software);
  }
};

exports.grantDatabaseAccess = async (user, database) => {
  logger.info(`Requesting ${database} access for user: ${user}`);
  
  try {
    await databaseService.requestAccess(user, database);
  } catch (error) {
    logger.error(`Failed to request database access:`, error);
    await notifyIT.sendDatabaseAccessRequest(user, database);
  }
};