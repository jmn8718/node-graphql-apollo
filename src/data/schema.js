const typeDefinitions = `
type User {
  _id: ID
  username: String
  name: String
  email: String
}

input UserInput {
  username: String!
  name: String
  email: String!
  password: String!
}

# The Location scalar type represents a geolocation point.
type Location {
  # Latitude of the location point
  lat: Float
  # Longitude of the location point
  lng: Float
}

input LocationInput {
  lat: Float!
  lng: Float!
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

input PlaceInput {
  name: String!
  description: String!
  category: String
  label: String
  location: LocationInput
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
  allPlaces: [Place]
}

type Mutation {
  createUser(user: UserInput): User
  deleteUser(username: String!): User
  authenticateUser(username: String!, password: String!): TokenRequest
  createPlace(place: PlaceInput): Place
}

schema {
  query: Query
  mutation: Mutation
}
`;

export default [typeDefinitions];
