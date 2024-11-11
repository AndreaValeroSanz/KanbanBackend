import { gql } from 'apollo-server-express';
const typeDefs = gql`
  type Card {
    _id: ID!
    title: String!
    description: String!
    duedate: String!
    type: String
    color: String
    user_id: ID!
    projects_id: ID!
  }

  type User {
    _id: ID!
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    getAllCards: [Card]
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    createCard(
      title: String!
      description: String!
      duedate: String!
      type: String
      color: String
      projects_id: ID!
    ): Card!
  }
`;

export default typeDefs;
