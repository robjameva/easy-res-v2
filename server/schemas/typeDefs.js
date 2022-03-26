// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`

type Book {
  bookId: String
  authors: [String]
  description: String
  title: String
  image: String
  link: String
  }

  input BookInput {
    authors: [String] 
    description: String!
    title: String!
    bookId: String!
    image: String, 
    link: String
  }

  input UserInput {
    first_name: String!
    last_name: String!
    phone_number: String!
    username: String!
    password: String!
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
  }

  type Query {
    getUser(userId: ID!): User
    getRestaurant(restaurantId: ID!): Restaurant
  }

  type Mutation {  
    login(email: String!, password: String!): Auth
    createUser(input: UserInput): Auth
    createRestaurant(input: RestaurantInput): Restaurant
    deleteBook(userId: ID!, bookId: String!): User
  }

  type Auth {
    token: ID!
    user: User
  }
`;

// export the typeDefs
module.exports = typeDefs;