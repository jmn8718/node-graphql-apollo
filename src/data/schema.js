const typeDefinitions = `
type LogInRequest {
  username: String
  password: String
}

type LogInResponse {
  access_token: String
  expires_in: Int
  refresh_token: String
  scope: String
  token_type: String
}

type Query {
  logIn(username: String, password:String): LogInResponse
}

schema {
  query: Query
}
`;

export default [typeDefinitions];
