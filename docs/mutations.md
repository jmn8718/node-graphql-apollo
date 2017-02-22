## create user
```
mutation CreateUser($user: UserInput) {
  createUser(user: $user) {
    _id
    username
    name
    email
  }
}
```

```
{
  "user": {
    "username": "user1",
    "password": "user1",
    "email": "user1@email.com",
    "name": "User 1"
  }
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
  "username": "user1",
  "password": "user1"
}
```

## delete user
```
mutation AuthenticaUser($username: String! $token: String!){
  deleteUser(username: $username) {
    _id
    username
    name
    email
  }
}
```

```
{
  "username": "username"
}
```

## create place
```
mutation CreatePlace($place: PlaceInput) {
  createPlace(place: $place) {
    _id
    name
    description
    category
    label
    location {
      lat
      lng
    }
  }
}
```

```
{
  "place": {
    "name": "place2",
    "description": "dasdasdasd",
    "location": {
      "lat": 5.9,
      "lng": 18.0
    },
    "label": "chinesse"
  }
}
```
