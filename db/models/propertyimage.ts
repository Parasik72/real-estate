import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { dbInstance } from '../db-instance';
import { Property } from './property';
import { UUID } from 'crypto';

export class PropertyImage extends Model<
  InferAttributes<PropertyImage>,
  InferCreationAttributes<PropertyImage>
> {
  declare propertyImageId: string;
  declare imageName: string;
  declare propertyId: UUID;
}

PropertyImage.init(
  {
    propertyImageId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    imageName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    propertyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Properties',
        key: 'propertyId'
      }
    }
  },
  {
    sequelize: dbInstance,
    tableName: 'PropertyImages'
  }
);

Property.hasMany(PropertyImage, { foreignKey: 'propertyId' });
PropertyImage.belongsTo(Property, { foreignKey: 'propertyId' });