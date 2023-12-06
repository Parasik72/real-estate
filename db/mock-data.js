const { v4 } = require('uuid');
const bcryptjs =  require('bcryptjs');

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

const demoProperties = [...new Array(10)].map(() => (
  [
    {
      propertyId: v4(),
      propertyType: 'House',
      propertyAddressId: demoPropertyAddresses[0].propertyAddressId,
      bedRooms: 4,
      bathRooms: 1,
      area: 60,
      title: 'Stunning Waterfront Home with Panoramic Views',
      description: 'This exceptional waterfront property offers breathtaking views of the serene ocean and provides an unrivaled lifestyle of luxury and tranquility. Situated on a generous lot, this magnificent residence boasts an expansive layout, exquisite finishes, and a private dock, making it the perfect retreat for those seeking a truly exceptional home.',
      priceAmount: 250000,
      userId: demoUsers[0].userId,
      propertyStatus: 'For sale',
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    },
    {
      propertyId: v4(),
      propertyType: 'Apartment',
      propertyAddressId: demoPropertyAddresses[1].propertyAddressId,
      bedRooms: 2,
      bathRooms: 1,
      area: 35,
      title: 'Charming Craftsman Home in Historic Neighborhood',
      description: 'Step back in time and experience the charm of this exquisite Craftsman home nestled in a prestigious historic neighborhood. Rich in character and architectural detail, this residence exudes warmth and elegance, offering a harmonious blend of modern conveniences and timeless charm.',
      priceAmount: 120000.50,
      userId: demoUsers[1].userId,
      propertyStatus: 'Awaiting',
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    },
    {
      propertyId: v4(),
      propertyType: 'Villa',
      propertyAddressId: demoPropertyAddresses[2].propertyAddressId,
      bedRooms: 8,
      bathRooms: 3,
      area: 230,
      title: 'Modern Penthouse with City Skyline Views',
      description: 'Soar above the city in this ultra-modern penthouse, offering unparalleled views of the vibrant cityscape. This sophisticated residence boasts a sleek, contemporary design, expansive living spaces, and state-of-the-art amenities, providing an unparalleled urban living experience.',
      priceAmount: 2200000.74,
      userId: demoUsers[2].userId,
      propertyStatus: 'Awaiting',
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    },
  ]
)).flat();

const demoDeals = [
  {
    dealId: v4(),
    dealStatus: 'Done',
    propertyId: demoProperties[0].propertyId,
    sellerUserId: demoUsers[1].userId,
    buyerUserId: demoUsers[0].userId,
    totalPrice: demoProperties[0].priceAmount,
    signDate: new Date().getTime(),
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime()
  },
  {
    dealId: v4(),
    dealStatus: 'Awaiting',
    propertyId: demoProperties[2].propertyId,
    sellerUserId: demoUsers[2].userId,
    buyerUserId: demoUsers[0].userId,
    totalPrice: demoProperties[2].priceAmount,
    signDate: null,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime()
  },
];

module.exports = {
  demoUsers,
  demoPropertyAddresses,
  demoProperties,
  demoDeals
}