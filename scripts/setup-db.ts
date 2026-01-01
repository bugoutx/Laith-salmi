import mysql from 'mysql2/promise';
import { readFileSync } from 'fs';
import { join } from 'path';

async function setupDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  });

  try {
    console.log('Setting up database...');
    
    // Read SQL file
    const sqlFile = readFileSync(join(process.cwd(), 'lib', 'db-setup.sql'), 'utf8');
    
    // Split by semicolon and execute each statement
    const statements = sqlFile
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    for (const statement of statements) {
      if (statement) {
        await connection.query(statement);
      }
    }

    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Error setting up database:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

setupDatabase()
  .then(() => {
    console.log('Setup finished');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Setup failed:', error);
    process.exit(1);
  });

