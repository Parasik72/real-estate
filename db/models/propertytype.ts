import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { dbInstance } from '../db-instance';
import { UUID } from 'crypto';

export class PropertyType extends Model<
  InferAttributes<PropertyType>,
  InferCreationAttributes<PropertyType>
> {
  declare propertyTypeId: UUID;
  declare typeName: string;
}

PropertyType.init(
  {
    propertyTypeId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    typeName: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING
    }
  },
  {
    sequelize: dbInstance,
    tableName: 'PropertyTypes'
  }
);