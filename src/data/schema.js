const typeDefinitions = `
type User {
  _id: ID
  username: String
  name: String
  email: String
}

# The Location scalar type represents a geolocation point.
type Location {
  # Latitude of the location point
  lat: Float
  # Longitude of the location point
  lng: Float
}

type Place {
  _id: ID
  name: String
  description: String
  category: String
  label: String
  location: Location
  creator: User
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
  Place(id: ID): Place
  Places: [Place]
}

type Mutation {
  createUser(username: String!, password: String!, name: String, email: String!): User
  deleteUser(username: String!): User
  authenticateUser(username: String!, password: String!): TokenRequest
  createPlace(name: String!, description: String!, category: String, label: String, lat: Float!, lng: Float!): Place
}

schema {
  query: Query
  mutation: Mutation
}
`;

export default [typeDefinitions];
