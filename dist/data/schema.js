"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var typeDefinitions = "\ntype User {\n  _id: ID\n  username: String\n  name: String\n  email: String\n}\n\ntype TokenRequest {\n  access_token: String\n  token_type: String\n  expires_in: Int\n  user: User\n}\n\ntype Query {\n  User(username: String!): User\n  Users: [User]\n}\n\ntype Mutation {\n  createUser(username: String!, password: String!, name: String, email: String!): User\n  deleteUser(username: String!, token: String!): User\n  authenticateUser(username: String!, password: String!): TokenRequest\n}\n\nschema {\n  query: Query\n  mutation: Mutation\n}\n";

exports.default = [typeDefinitions];
//# sourceMappingURL=schema.js.map