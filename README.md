# Slack Onboarding Bot

A Slack bot for automating the onboarding process of new team members. This bot helps streamline the process of granting access to various software and databases that new employees need.

## Features

- Welcomes new team members when they join the Slack workspace
- Guides new members through the onboarding process
- Automates access requests for various software (JIRA, GitHub, Confluence)
- Handles database access requests
- Notifies IT team for manual interventions when necessary

## Prerequisites

- Node.js (v14 or later)
- npm
- PostgreSQL database
- Slack workspace with admin privileges
- JIRA account
- GitHub organization
- Confluence account

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/slack-onboarding-bot.git
   cd slack-onboarding-bot
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the setup script to create your `.env` file:
   ```
   npm run setup
   ```

4. After the setup script, review your `.env` file and make any necessary adjustments.

## Usage

To start the bot:

```
npm start
```

For development with auto-restart on file changes:

```
npm run dev
```

## Testing

To run the test suite:

```
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- [Botkit](https://github.com/howdyai/botkit) for the Slack bot framework
- [Slack API](https://api.slack.com/) for enabling bot interactions
- All other open-source libraries used in this project
