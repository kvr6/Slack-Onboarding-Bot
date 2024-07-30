const { expect } = require('chai');
const nock = require('nock');
const slackService = require('../../src/services/slackService');
const config = require('../../config/default');

describe('Slack Integration', () => {
  beforeEach(() => {
    nock.disableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  it('should send a direct message', async () => {
    const userId = 'U1234567';
    const message = 'Test message';

    nock('https://slack.com')
      .post('/api/chat.postMessage')
      .reply(200, { ok: true, channel: userId, ts: '1234567890.123456' });

    const result = await slackService.sendDirectMessage(userId, message);

    expect(result.ok).to.be.true;
    expect(result.channel).to.equal(userId);
  });

  it('should get user info', async () => {
    const userId = 'U1234567';

    nock('https://slack.com')
      .post('/api/users.info')
      .reply(200, {
        ok: true,
        user: {
          id: userId,
          name: 'testuser',
          real_name: 'Test User',
        },
      });

    const result = await slackService.getUserInfo(userId);

    expect(result.id).to.equal(userId);
    expect(result.name).to.equal('testuser');
  });

  it('should add user to channel', async () => {
    const userId = 'U1234567';
    const channelId = 'C1234567';

    nock('https://slack.com')
      .post('/api/conversations.invite')
      .reply(200, { ok: true, channel: { id: channelId } });

    const result = await slackService.addUserToChannel(userId, channelId);

    expect(result.ok).to.be.true;
    expect(result.channel.id).to.equal(channelId);
  });
});