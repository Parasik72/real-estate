import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { dbInstance } from '../db-instance';
import { UUID } from 'crypto';

export class PropertyAddress extends Model<
  InferAttributes<PropertyAddress>,
  InferCreationAttributes<PropertyAddress>
> {
  declare propertyAddressId: UUID;
  declare countryName: string;
  declare cityName: string;
  declare addressLine1: string;
  declare addressLine2: string | null;
}

PropertyAddress.init(
  {
    propertyAddressId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    countryName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    cityName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    addressLine1: {
      allowNull: false,
      type: DataTypes.STRING
    },
    addressLine2: {
      allowNull: true,
      type: DataTypes.STRING
    }
  },
  {
    sequelize: dbInstance,
    tableName: 'PropertyAddresses'
  }
);