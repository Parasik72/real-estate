import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { dbInstance } from '../db-instance';
import { UUID } from 'crypto';

export class DealStatus extends Model<
  InferAttributes<DealStatus>,
  InferCreationAttributes<DealStatus>
> {
  declare dealStatusId: UUID;
  declare statusName: string;
}

DealStatus.init(
  {
    dealStatusId: {
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
    tableName: 'DealStatuses'
  }
);