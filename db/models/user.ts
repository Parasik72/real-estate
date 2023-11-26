import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { dbInstance } from '../db-instance';
import { UUID } from 'crypto';

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare userId: UUID;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare phone: string;
  declare password: string;
  declare createdAt: BigInt;
  declare updatedAt: BigInt;
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
      unique: true,
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
      allowNull: true,
      type: DataTypes.BIGINT
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.BIGINT
    }
  },
  {
    sequelize: dbInstance,
    tableName: 'Users'
  }
);