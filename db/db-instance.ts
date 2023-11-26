import { Sequelize } from "sequelize";

export const dbInstance = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOSTNAME,
        dialect: 'mysql',
        define: {
          timestamps: false
        }
    }
);