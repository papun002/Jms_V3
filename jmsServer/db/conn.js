const { Sequelize } = require('sequelize');

  // const sequelize = new Sequelize('sql6704020', 'sql6704020', 'SEgz8V9vQn', {
  //   host: 'sql6.freesqldatabase.com',
  //   port: 3306,
  //   dialect: 'mysql',
  //   logging: false,
  // });

  const sequelize = new Sequelize('jms', 'postgres', '12345', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false,
  });

const checkDatabaseExists = async () => {
  try {
    const result = await sequelize.query("SELECT 1 FROM pg_database WHERE datname = 'jms'");
    return result[0].length > 0;
  } catch (err) {
    console.error('Error checking database existence:', err);
    return false;
  }
};

const createDatabase = async () => {
  try {
    const databaseExists = await checkDatabaseExists();
    if (databaseExists) {
      // console.log('---------Database already exists-------');
    } else {
      await sequelize.query('CREATE DATABASE jms');
      console.log('Database created');
    }
  } catch (err) {
    console.error(err);
  }
};
createDatabase();
module.exports = sequelize;