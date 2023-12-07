import { Model, DataTypes, BuildOptions } from 'sequelize';
import { IUser } from '@/server/types/user.types';
import IContextContainer from '@/server/context/icontext-container';

export type UserType = typeof Model & {
  new (values?: object, options?: BuildOptions): IUser;
}

export default (ctx: IContextContainer) => {
  const User = <UserType>ctx.dbInstance.define('Users', {
    userId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.BIGINT
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.BIGINT
    }
  });
  return User;
}