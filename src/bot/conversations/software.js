const { BotkitConversation } = require('botkit');
const grantAccess = require('../actions/grantAccess');
const logger = require('../../utils/logger');

module.exports = (controller) => {
  const convo = new BotkitConversation('software', controller);

  convo.ask('What software do you need access to? (e.g., JIRA, GitHub, Confluence)', [
    {
      default: true,
      handler: async (response, convo, bot) => {
        const software = response.trim().split(',').map(s => s.trim());
        convo.setVar('software', software);
        
        for (const sw of software) {
          try {
            await grantAccess.grantSoftwareAccess(convo.vars.user, sw);
            await bot.say(`Access granted to ${sw}.`);
          } catch (error) {
            logger.error(`Failed to grant access to ${sw}:`, error);
            await bot.say(`There was an issue granting access to ${sw}. Our IT team will follow up.`);
          }
        }
        
        return true;
      }
    }
  ]);

  convo.after(async (results, bot) => {
    logger.info(`Software onboarding completed for user: ${results.user}`);
  });

  controller.addDialog(convo);
};