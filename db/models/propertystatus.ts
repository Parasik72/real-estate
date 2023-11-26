import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { dbInstance } from '../db-instance';
import { UUID } from 'crypto';

export class PropertyStatus extends Model<
  InferAttributes<PropertyStatus>, 
  InferCreationAttributes<PropertyStatus>
> {
  declare propertyStatusId: UUID;
  declare statusName: string;
}

PropertyStatus.init(
  {
    propertyStatusId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    statusName: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING
    }
  },
  {
    sequelize: dbInstance,
    tableName: 'PropertyStatuses'
  }
);