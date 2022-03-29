// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`

type Reservation {
  party_size: Int
  time_slot: Int
  user: User
  restaurant: Restaurant
}

input ReservationInput {
  party_size: Int!
  time_slot: Int!
  user: ID!
  restaurant: ID!
}
input UserInput {
  first_name: String!
  last_name: String!
  phone_number: String!
  username: String!
  password: String!
  confirm_password: String!
  email: String!
}

input RestaurantInput {
  occupancy: Int!
  business_name: String!
  business_address: String!
  business_phone: String!
  business_hours_open: String!
  business_hours_close: String!
  business_website: String!
  business_image: String!
}

type User {
  _id: ID
  first_name: String
  last_name: String
  phone_number: String
  username: String
  email: String
}

type Restaurant {
  _id: ID
  occupancy: Int
  business_name: String
  business_address: String
  business_phone: String
  business_hours_open: String
  business_hours_close: String
  business_website: String
  business_image: String
  reservations: [Reservation]
}

type Query {
  getUser(userId: ID!): User
  getRestaurant(restaurantId: ID!): Restaurant
  getAllRestaurants: [Restaurant]
}

type Mutation {  
  login(email: String!, password: String!): Auth
  createUser(input: UserInput): Auth
  createRestaurant(input: RestaurantInput): Restaurant
  createReservation(input: ReservationInput): Reservation
}

type Auth {
  token: ID!
  user: User
}
`;

// export the typeDefs
module.exports = typeDefs;