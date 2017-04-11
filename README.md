# node-graphql-apollo

## Environment
docker run -p 27017:27017 --name mongo-node -d mongo
docker exec -it mongo-node bash
mongoimport restaurants.json -d graphql -c places
db.places.createIndex({ location: "2dsphere" })

mongoimport -h ds141368.mlab.com:41368 -d graqhql -c places -u <user> -p <password> --file restaurants.json
## References
- https://dev-blog.apollodata.com/all-you-need-to-know-about-graphql-js-0-7-921e75dd7fd1#.m4ugefqat
- https://github.com/jmn8718/coursera-server_side_development/blob/master/w4/rest-server-passport/routes/dishRouter.js
- http://dev.apollodata.com/tools/graphql-server/requests.html
- https://facebook.github.io/relay/docs/graphql-relay-specification.html
- https://medium.com/@clayallsopp/relay-101-building-a-hacker-news-client-bb8b2bdc76e6#.4qgsvfb5q
- https://www.learnrelay.org/connections/what-is-a-connection/
- https://docs.mongodb.com/manual/tutorial/geospatial-tutorial/
