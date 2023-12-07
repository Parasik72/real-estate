import { Model, DataTypes, BuildOptions } from 'sequelize';
import { IPropertyAddress } from '@/server/types/properties.types';
import IContextContainer from '@/server/context/icontext-container';

export type PropertyAddressType = typeof Model & {
  new (values?: object, options?: BuildOptions): IPropertyAddress;
}

export default (ctx: IContextContainer) => {
  const PropertyAddress = <PropertyAddressType>ctx.dbInstance.define('PropertyAddresses', {
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
  });

  PropertyAddress.hasOne(ctx.Property, { foreignKey: 'propertyAddressId' });
  ctx.Property.belongsTo(PropertyAddress, { foreignKey: 'propertyAddressId'});

  return PropertyAddress;
}