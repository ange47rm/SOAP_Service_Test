const sqlite3 = require('sqlite3').verbose();

// Create an SQLite database and open a connection
const db = new sqlite3.Database('your-database.db');

// Initialize the database table if it doesn't exist
db.run('CREATE TABLE IF NOT EXISTS email_data (id INTEGER PRIMARY KEY, email TEXT NOT NULL, is_yes_or_no BOOLEAN)');

const soapRepository = {
  storeValue: async (email, value) => {
    try {
      // Insert a new row into the 'email_data' table
      const stmt = db.prepare('INSERT INTO email_data (email, is_yes_or_no) VALUES (?, ?)');
      stmt.run(email, value === 'yes' ? 1 : 0); // Convert 'yes' to 1 and 'no' to 0
      stmt.finalize();
    } catch (error) {
      // Handle errors
      console.error('Error storing value:', error);
      throw error;
    }
  },
};

module.exports = soapRepository;
