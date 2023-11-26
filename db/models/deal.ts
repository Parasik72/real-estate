import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { dbInstance } from '../db-instance';
import { DealStatus } from './dealstatus';
import { Property } from './property';
import { User } from './user';
import { UUID } from 'crypto';

export class Deal extends Model<
  InferAttributes<Deal>,
  InferCreationAttributes<Deal>
> {
  declare dealId: UUID;
  declare signDate: BigInt | null;
  declare totalPrice: number | null;
  declare dealStatusId: UUID;
  declare propertyId: UUID;
  declare sellerUserId: UUID;
  declare buyerUserId: UUID;
  declare createdAt: BigInt;
  declare updatedAt: BigInt;
}

Deal.init(
  {
    dealId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    signDate: {
      allowNull: true,
      type: DataTypes.BIGINT
    },
    totalPrice: {
      allowNull: true,
      type: DataTypes.DECIMAL
    },
    dealStatusId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'DealStatuses',
        key: 'dealStatusId'
      }
    },
    propertyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Properties',
        key: 'propertyId'
      }
    },
    sellerUserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'userId'
      }
    },
    buyerUserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'userId'
      }
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
    tableName: 'Deals'
  }
);

DealStatus.hasMany(Deal, { foreignKey: 'dealStatusId' });
Deal.belongsTo(DealStatus, { foreignKey: 'dealStatusId' });

Property.hasMany(Deal, { foreignKey: 'propertyId' });
Deal.belongsTo(Property, { foreignKey: 'propertyId' });

User.hasMany(Deal, { foreignKey: 'sellerUserId' });
Deal.belongsTo(User, { foreignKey: 'sellerUserId', as: 'seller' });

User.hasMany(Deal, { foreignKey: 'buyerUserId' });
Deal.belongsTo(User, { foreignKey: 'buyerUserId', as: 'buyer' });