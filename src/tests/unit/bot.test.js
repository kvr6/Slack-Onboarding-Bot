const { expect } = require('chai');
const sinon = require('sinon');
const OnboardingBot = require('../../src/bot');
const slackService = require('../../src/services/slackService');

describe('OnboardingBot', () => {
  let bot;
  let slackServiceMock;

  beforeEach(() => {
    slackServiceMock = sinon.mock(slackService);
    bot = new OnboardingBot();
  });

  afterEach(() => {
    slackServiceMock.verify();
    slackServiceMock.restore();
  });

  it('should initialize conversations', () => {
    expect(bot.controller.dialogSet.dialogs.size).to.be.greaterThan(0);
  });

  it('should handle team_join event', async () => {
    const fakeBotInstance = {
      startConversationWithUser: sinon.stub().resolves(),
      beginDialog: sinon.stub().resolves(),
    };

    const fakeMessage = { user: 'U1234567' };

    slackServiceMock.expects('sendDirectMessage')
      .once()
      .withArgs(fakeMessage.user, sinon.match.string)
      .resolves();

    await bot.controller.handleWebhookPayload({
      type: 'event_callback',
      event: {
        type: 'team_join',
        user: fakeMessage.user,
      },
    }, fakeBotInstance);

    expect(fakeBotInstance.startConversationWithUser.calledOnce).to.be.true;
    expect(fakeBotInstance.beginDialog.calledOnce).to.be.true;
    expect(fakeBotInstance.beginDialog.calledWith('welcome')).to.be.true;
  });
});