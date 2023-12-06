import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { dbInstance } from '../db-instance';
import { User } from './user';
import { PropertyAddress } from './propertyaddress';
import { UUID } from 'crypto';
import { PropertyStatuses, PropertyTypes } from '@/server/types/properties.types';

type PropertyStatus = PropertyStatuses.Awaiting | PropertyStatuses.ForSale;
type PropertyType = PropertyTypes.House | PropertyTypes.Apartment | PropertyTypes.Villa;

export class Property extends Model<
  InferAttributes<Property>,
  InferCreationAttributes<Property>
> {
  declare propertyId: UUID;
  declare bedRooms: number;
  declare bathRooms: number;
  declare area: number;
  declare title: string;
  declare description: string;
  declare priceAmount: number;
  declare propertyStatus: PropertyStatus;
  declare userId: UUID;
  declare propertyAddressId: UUID;
  declare propertyType: PropertyType;
  declare createdAt: BigInt;
  declare updatedAt: BigInt;
}

Property.init(
  {
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
  },
  {
    sequelize: dbInstance,
    tableName: 'Properties'
  }
);

User.hasMany(Property, { foreignKey: 'userId' });
Property.belongsTo(User, { foreignKey: 'userId'});

PropertyAddress.hasOne(Property, { foreignKey: 'propertyAddressId' });
Property.belongsTo(PropertyAddress, { foreignKey: 'propertyAddressId'});