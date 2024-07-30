const { Client } = require('pg');
const config = require('../../config/default');
const logger = require('../utils/logger');

class DatabaseService {
  constructor() {
    this.client = new Client({
      host: config.database.host,
      port: config.database.port,
      database: config.database.name,
      user: config.database.user,
      password: config.database.password,
    });
  }

  async connect() {
    try {
      await this.client.connect();
      logger.info('Connected to the database successfully');
    } catch (error) {
      logger.error('Failed to connect to the database:', error.message);
      throw new Error(`Database connection failed: ${error.message}`);
    }
  }

  async requestAccess(user, database) {
    try {
      await this.connect();
      
      const query = `
        INSERT INTO access_requests (user_email, database_name, status)
        VALUES ($1, $2, 'pending')
      `;
      await this.client.query(query, [user, database]);

      logger.info(`Access request for ${database} submitted for user ${user}`);
    } catch (error) {
      logger.error(`Failed to submit access request for ${user} to ${database}:`, error.message);
      throw new Error(`Database access request failed: ${error.message}`);
    } finally {
      await this.client.end();
    }
  }

  async grantAccess(user, database) {
    try {
      await this.connect();
      
      // In a real-world scenario, you would implement the actual access granting logic here.
      // This might involve creating a new user in the database, granting permissions, etc.
      // For this example, we'll just update the status of the access request.
      
      const query = `
        UPDATE access_requests
        SET status = 'granted'
        WHERE user_email = $1 AND database_name = $2
      `;
      await this.client.query(query, [user, database]);

      logger.info(`Access to ${database} granted for user ${user}`);
    } catch (error) {
      logger.error(`Failed to grant access for ${user} to ${database}:`, error.message);
      throw new Error(`Database access grant failed: ${error.message}`);
    } finally {
      await this.client.end();
    }
  }
}

module.exports = new DatabaseService();