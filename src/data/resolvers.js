import rp from 'request-promise-native';

const resolveFunctions = {
  Query: {
    logIn(root, args) {
      const options = {
        uri: `${process.env.ENDPOINT}/api/oauth2/token/`,
        method: 'POST',
        form: {
          username: args.username,
          password: args.password,
          grant_type: process.env.GRANT_TYPE,
          client_id: process.env.CLIENT_ID,
        },
        json: true,
      };
      return rp(options)
        .then(resp => resp)
        .catch(err => ({
          status: err.statusCode,
          message: err.message,
          error: err.error,
        }));
    },
  },
};

export default resolveFunctions;
