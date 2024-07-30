const { BotkitConversation } = require('botkit');
const grantAccess = require('../actions/grantAccess');
const logger = require('../../utils/logger');

module.exports = (controller) => {
  const convo = new BotkitConversation('database', controller);

  convo.ask('What databases do you need access to?', [
    {
      default: true,
      handler: async (response, convo, bot) => {
        const databases = response.trim().split(',').map(db => db.trim());
        convo.setVar('databases', databases);
        
        for (const db of databases) {
          try {
            await grantAccess.grantDatabaseAccess(convo.vars.user, db);
            await bot.say(`Access request submitted for ${db}.`);
          } catch (error) {
            logger.error(`Failed to submit access request for ${db}:`, error);
            await bot.say(`There was an issue with the access request for ${db}. Our IT team will follow up.`);
          }
        }
        
        return true;
      }
    }
  ]);

  convo.after(async (results, bot) => {
    logger.info(`Database onboarding completed for user: ${results.user}`);
  });

  controller.addDialog(convo);
};