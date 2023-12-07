import { Model, DataTypes, BuildOptions } from 'sequelize';
import { 
  IProperty, 
  PropertyStatuses, 
  PropertyTypes 
} from '@/server/types/properties.types';
import IContextContainer from '@/server/context/icontext-container';

export type PropertyType = typeof Model & {
  new (values?: object, options?: BuildOptions): IProperty;
}

export default (ctx: IContextContainer) => {
  const Property = <PropertyType>ctx.dbInstance.define('Properties', {
    propertyId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    bedRooms: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    bathRooms: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    area: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING(1000)
    },
    priceAmount: {
      allowNull: false,
      type: DataTypes.DECIMAL
    },
    propertyStatus: {
      allowNull: false,
      type: DataTypes.ENUM(
        PropertyStatuses.Awaiting, 
        PropertyStatuses.ForSale
      )
    },
    propertyType: { 
			allowNull: false,
      type: DataTypes.ENUM(
        PropertyTypes.House, 
        PropertyTypes.Apartment,
        PropertyTypes.Villa
      )
		},
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'userId'
      }
    },
    propertyAddressId: { 
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: 'PropertyAddresses',
				key: 'propertyAddressId'
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

  Property.belongsTo(ctx.User, { foreignKey: 'userId'});
  ctx.User.hasMany(Property, { foreignKey: 'userId' });

  return Property;
}