const { v4 } = require('uuid');
const bcryptjs =  require('bcryptjs');

const demoPropertyStatuses = [
    { 
      propertyStatusId: v4(),
      statusName: 'For sale'
    },
    { 
      propertyStatusId: v4(),
      statusName: 'Awaiting',
    },
];

const demoPropertyTypes = [
  { 
    propertyTypeId: v4(),
    typeName: 'House'
  },
  { 
    propertyTypeId: v4(),
    typeName: 'Apartment'
  },
  { 
    propertyTypeId: v4(),
    typeName: 'Villa'
  }
];

const demoDealStatuses = [
  { 
    dealStatusId: v4(),
    statusName: 'Done'
  },
  { 
    dealStatusId: v4(),
    statusName: 'Awaiting'
  }
];

const demoUsers = [
  {
    userId: v4(),
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe.demo@gmail.com',
    phone: '+380111111111',
    password: bcryptjs.hashSync('johndoe', 5),
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  },
  {
    userId: v4(),
    firstName: 'Andrew',
    lastName: 'Cooper',
    email: 'andrewcooper.demo@gmail.com',
    phone: '+380111111112',
    password: bcryptjs.hashSync('andrewcooper', 5),
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  },
  {
    userId: v4(),
    firstName: 'Maria',
    lastName: 'Shevchenko',
    email: 'mariashevchenko.demo@gmail.com',
    phone: '+380111111113',
    password: bcryptjs.hashSync('mariashevchenko', 5),
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  },
];

const demoPropertyAddresses = [
  {
    propertyAddressId: v4(),
    countryName: 'Ukraine',
    cityName: 'Kyiv',
    addressLine1: '12/2 M. Grushevs’kyi Street',
    addressLine2: '01008'
  },
  {
    propertyAddressId: v4(),
    countryName: 'Ukraine',
    cityName: 'Kyiv',
    addressLine1: '24 Khreshchatyk Street',
    addressLine2: null
  },
  {
    propertyAddressId: v4(),
    countryName: 'USA',
    cityName: 'New York',
    addressLine1: '47 W 13th St',
    addressLine2: '10011'
  },
];

const demoProperties = [
  {
    propertyId: v4(),
    propertyTypeId: demoPropertyTypes[0].propertyTypeId,
    propertyAddressId: demoPropertyAddresses[0].propertyAddressId,
    bedRooms: 4,
    bathRooms: 1,
    area: 60,
    description: 'A litle description of House',
    priceAmount: 250000,
    userId: demoUsers[0].userId,
    propertyStatusId: demoPropertyStatuses[0].propertyStatusId,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  },
  {
    propertyId: v4(),
    propertyTypeId: demoPropertyTypes[1].propertyTypeId,
    propertyAddressId: demoPropertyAddresses[1].propertyAddressId,
    bedRooms: 2,
    bathRooms: 1,
    area: 35,
    description: 'A litle description of Appartment',
    priceAmount: 120000.50,
    userId: demoUsers[1].userId,
    propertyStatusId: demoPropertyStatuses[1].propertyStatusId,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  },
  {
    propertyId: v4(),
    propertyTypeId: demoPropertyTypes[2].propertyTypeId,
    propertyAddressId: demoPropertyAddresses[2].propertyAddressId,
    bedRooms: 8,
    bathRooms: 3,
    area: 230,
    description: 'A litle description of Villa',
    priceAmount: 2200000.74,
    userId: demoUsers[2].userId,
    propertyStatusId: demoPropertyStatuses[1].propertyStatusId,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  },
];

const demoDeals = [
  {
    dealId: v4(),
    dealStatusId: demoDealStatuses[0].dealStatusId,
    propertyId: demoProperties[0].propertyId,
    sellerUserId: demoUsers[1].userId,
    buyerUserId: demoUsers[0].userId,
    signDate: new Date().getTime(),
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime()
  },
  {
    dealId: v4(),
    dealStatusId: demoDealStatuses[1].dealStatusId,
    propertyId: demoProperties[2].propertyId,
    sellerUserId: demoUsers[2].userId,
    buyerUserId: demoUsers[0].userId,
    signDate: null,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime()
  },
];


module.exports = {
  demoPropertyStatuses,
  demoPropertyTypes,
  demoDealStatuses,
  demoUsers,
  demoPropertyAddresses,
  demoProperties,
  demoDeals
}