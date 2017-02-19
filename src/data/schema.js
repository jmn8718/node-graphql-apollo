const typeDefinitions = `
type User {
  _id: ID
  username: String
  name: String
  email: String
}

type TokenRequest {
  access_token: String
  token_type: String
  expires_in: Int
  user: User
}

type Query {
  User(username: String!): User
  Users: [User]
}

type Mutation {
  createUser(username: String!, password: String!, name: String, email: String!): User
  deleteUser(username: String!, token: String!): User
  authenticateUser(username: String!, password: String!): TokenRequest
}

schema {
  query: Query
  mutation: Mutation
}
`;

export default [typeDefinitions];
