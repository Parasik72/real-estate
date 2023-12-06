import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { dbInstance } from '../db-instance';
import { Property } from './property';
import { User } from './user';
import { UUID } from 'crypto';
import { DealStatuses } from '@/server/types/deal.type';

type DealStatus = DealStatuses.Awaiting | DealStatuses.Canceled | DealStatuses.Done;

export class Deal extends Model<
  InferAttributes<Deal>,
  InferCreationAttributes<Deal>
> {
  declare dealId: UUID;
  declare signDate: BigInt | null;
  declare totalPrice: number;
  declare dealStatus: DealStatus;
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
      allowNull: false,
      type: DataTypes.DECIMAL
    },
    dealStatus: {
      allowNull: false,
      type: DataTypes.ENUM(
        DealStatuses.Awaiting, 
        DealStatuses.Canceled, 
        DealStatuses.Done
      )
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

Property.hasMany(Deal, { foreignKey: 'propertyId' });
Deal.belongsTo(Property, { foreignKey: 'propertyId' });

User.hasMany(Deal, { foreignKey: 'sellerUserId' });
Deal.belongsTo(User, { foreignKey: 'sellerUserId', as: 'seller' });

User.hasMany(Deal, { foreignKey: 'buyerUserId' });
Deal.belongsTo(User, { foreignKey: 'buyerUserId', as: 'buyer' });