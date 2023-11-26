import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { dbInstance } from '../db-instance';
import { User } from './user';
import { PropertyStatus } from './propertystatus';
import { PropertyAddress } from './propertyaddress';
import { PropertyType } from './propertytype';
import { UUID } from 'crypto';

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
  declare propertyStatusId: UUID;
  declare userId: UUID;
  declare propertyAddressId: UUID;
  declare propertyTypeId: UUID;
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
    propertyStatusId: { 
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: 'PropertyStatuses',
				key: 'propertyStatusId'
			}
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
    propertyTypeId: { 
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: 'PropertyTypes',
				key: 'propertyTypeId'
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

PropertyStatus.hasMany(Property, { foreignKey: 'propertyStatusId' });
Property.belongsTo(PropertyStatus, { foreignKey: 'propertyStatusId' });

User.hasMany(Property, { foreignKey: 'userId' });
Property.belongsTo(User, { foreignKey: 'userId'});

PropertyAddress.hasOne(Property, { foreignKey: 'propertyAddressId' });
Property.belongsTo(PropertyAddress, { foreignKey: 'propertyAddressId'});

PropertyType.hasMany(Property, { foreignKey: 'propertyTypeId' });
Property.belongsTo(PropertyType, { foreignKey: 'propertyTypeId'});