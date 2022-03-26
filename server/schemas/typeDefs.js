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

  type User {
    _id: ID
    first_name: String
    last_name: String
    phone_number: String
    username: String
    email: String
  }

  type Query {
    me(userId: ID!): User
  }

  type Mutation {  
    login(email: String!, password: String!): Auth
    createUser(input: UserInput): Auth
    saveBook(userId: ID!, input: BookInput): User
    deleteBook(userId: ID!, bookId: String!): User
  }

  type Auth {
    token: ID!
    user: User
  }
`;

// export the typeDefs
module.exports = typeDefs;