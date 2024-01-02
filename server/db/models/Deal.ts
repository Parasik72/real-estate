import { Model, DataTypes, BuildOptions } from 'sequelize';
import { DealStatuses, IDeal } from '@/server/types/deal.type';
import IContextContainer from '@/server/context/icontext-container';

export type DealType = typeof Model & {
  new (values?: object, options?: BuildOptions): IDeal;
}

export const defineModel = (ctx: IContextContainer) => {
  return <DealType>ctx.dbInstance.define('Deals', {
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
  });
}

export const defineAssociations = (ctx: IContextContainer) => {
  ctx.Property.hasMany(ctx.Deal, { foreignKey: 'propertyId' });
  ctx.Deal.belongsTo(ctx.Property, { foreignKey: 'propertyId' });

  ctx.User.hasMany(ctx.Deal, { foreignKey: 'sellerUserId' });
  ctx.Deal.belongsTo(ctx.User, { foreignKey: 'sellerUserId', as: 'seller' });

  ctx.User.hasMany(ctx.Deal, { foreignKey: 'buyerUserId' });
  ctx.Deal.belongsTo(ctx.User, { foreignKey: 'buyerUserId', as: 'buyer' });
}