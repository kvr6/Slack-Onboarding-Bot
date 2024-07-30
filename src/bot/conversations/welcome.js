const logger = require('../../utils/logger');

module.exports = (controller) => {
  controller.addDialog('welcome', [
    {
      action: async (step) => {
        await step.say(`Welcome to the team, <@${step.values.user}>! I'm the onboarding bot. Let's get you set up.`);
        return step.next();
      }
    },
    {
      action: async (step) => {
        await step.say("First, let's go through the software you'll need access to.");
        return step.beginDialog('software');
      }
    },
    {
      action: async (step) => {
        await step.say("Great! Now let's discuss the databases you'll need.");
        return step.beginDialog('database');
      }
    },
    {
      action: async (step) => {
        await step.say("Thank you for providing all the information. Our IT team will process your requests shortly.");
        logger.info(`Onboarding completed for user: ${step.values.user}`);
        return step.endDialog();
      }
    }
  ]);
};