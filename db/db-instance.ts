import { Sequelize } from "sequelize";

export const dbInstance = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOSTNAME,
        dialect: 'mysql'
    }
);

const connect = async () => {
    try {
      await dbInstance.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      process.exit(1);
    }
}

connect();