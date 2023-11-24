import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { dbInstance } from '../db-instance';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare userId: string;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare phone: string;
  declare password: string;
  declare createdAt: number;
  declare updatedAt: number;
}

User.init(
  {
    userId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.BIGINT
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.BIGINT
      }
  },
  {
    sequelize: dbInstance,
    tableName: 'Users'
  }
);