import { Model, DataTypes, BuildOptions } from 'sequelize';
import { IPropertyImage } from '@/server/types/properties.types';
import IContextContainer from '@/server/context/icontext-container';

export type PropertyImageType = typeof Model & {
  new (values?: object, options?: BuildOptions): IPropertyImage;
}

export const defineModel = (ctx: IContextContainer) => {
  return <PropertyImageType>ctx.dbInstance.define('PropertyImages', {
    propertyImageId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    imgName: {
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
  });
}

export const defineAssociations = (ctx: IContextContainer) => {
  ctx.PropertyImage.belongsTo(ctx.Property, { foreignKey: 'propertyId' });
  ctx.Property.hasMany(ctx.PropertyImage, { foreignKey: 'propertyId' });
}