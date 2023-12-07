import { Model, DataTypes, BuildOptions } from 'sequelize';
import { IPropertyImage } from '@/server/types/properties.types';
import IContextContainer from '@/server/context/icontext-container';

export type PropertyImageType = typeof Model & {
  new (values?: object, options?: BuildOptions): IPropertyImage;
}

export default (ctx: IContextContainer) => {
  const PropertyImage = <PropertyImageType>ctx.dbInstance.define('PropertyImages', {
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

  PropertyImage.belongsTo(ctx.Property, { foreignKey: 'propertyId' });
  ctx.Property.hasMany(PropertyImage, { foreignKey: 'propertyId' });

  return PropertyImage;
}