"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var typeDefinitions = "\ntype User {\n  _id: ID\n  username: String\n  name: String\n  email: String\n}\n\n# The Location scalar type represents a geolocation point.\ntype Location {\n  # Latitude of the location point\n  lat: Float\n  # Longitude of the location point\n  lng: Float\n}\n\ntype Place {\n  _id: ID\n  name: String\n  description: String\n  category: String\n  label: String\n  location: Location\n  creator: User\n}\n\ntype TokenRequest {\n  access_token: String\n  token_type: String\n  expires_in: Int\n  user: User\n}\n\ntype Query {\n  User(username: String!): User\n  Users: [User]\n  Place(id: ID): Place\n  Places: [Place]\n}\n\ntype Mutation {\n  createUser(username: String!, password: String!, name: String, email: String!): User\n  deleteUser(username: String!): User\n  authenticateUser(username: String!, password: String!): TokenRequest\n  createPlace(name: String!, description: String!, category: String, label: String, lat: Float!, lng: Float!): Place\n}\n\nschema {\n  query: Query\n  mutation: Mutation\n}\n";

exports.default = [typeDefinitions];
//# sourceMappingURL=schema.js.map