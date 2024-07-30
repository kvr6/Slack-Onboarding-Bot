# Slack Onboarding Bot

This project implements an onboarding bot for Slack that automatically interacts with new team members and provides them access to relevant software and databases.

## Features

- Welcomes new team members when they join the Slack workspace
- Asks about required software and database access
- Automates the process of granting access to requested resources

## Prerequisites

- Node.js (v12 or later)
- npm (Node Package Manager)
- A Slack workspace with permissions to add bots

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/slack-onboarding-bot.git
   cd slack-onboarding-bot
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your environment variables:
   - Copy the `.env.example` file to a new file named `.env`:
     ```
     cp .env.example .env
     ```
   - Open the `.env` file and fill in your actual values for each variable.

   **Important:** The `.env` file contains sensitive information and should never be committed to the repository. It is already included in `.gitignore` to prevent accidental commits. Always keep your actual `.env` file secure and never share it publicly.

## Usage

To start the bot:

```
node bot.js
```

## Testing

To run the Selenium tests:

```
npm test
```

Note: Make sure you have Chrome WebDriver installed and configured for Selenium tests.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
