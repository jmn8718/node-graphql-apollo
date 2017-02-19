## create user
```
mutation CreateUser($username: String! $password: String! $email: String!){
  createUser(username: $username password: $password email: $email) {
    _id
    username
    name
    email
  }
}
```

```
{
  "username": "username",
  "password": "password",
  "email": "email@email.com"
}
```

## authenticate
```
mutation AuthenticaUser($username: String! $password: String!){
  authenticateUser(username: $username password: $password) {
    access_token
    token_type
    expires_in
  }
}
```

```
{
  "username": "username",
  "password": "password"
}
```

## delete user
```
mutation AuthenticaUser($username: String! $token: String!){
  deleteUser(username: $username token:$token) {
    _id
    username
    name
    email
  }
}
```

```
{
  "username": "username",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4YThlM2EzNDQ2NzRhNmMxNTY0NzJkZCIsInVzZXJuYW1lIjoidXNlcm5hbWUiLCJpYXQiOjE0ODc0NjM0NTEsImV4cCI6MTQ4NzQ2NzA1MX0.1BW_1QaI5XTsHC-Pxl8aWhxKgmH6vHM1jlnzlb7KUJs"
}
```

```
```
