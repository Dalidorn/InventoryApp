// dependancies
const jwt = require("jsonwebtoken");

// declare expiration time for tokens and secret
const jwtSecret = process.env.JWT_SECRET;
const expiration = "4h";

// export two functions, one for use in middleware to authorize requests based on token, and the other to provide a signed token
module.exports = {

    authMiddleware: function ({ req }) {
      let token = req.body.token || req.query.token || req.headers.authorization;
  
      if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
      }
  
      if (!token) {
        return req;
      }
  
      try {
        const { data } = jwt.verify(token, jwtSecret, { maxAge: expiration });
        req.user = data;
      } catch {
        console.log('Invalid token');
      }
  
      return req;
    },

    signToken: function ({ store, _id, isManager }) {
      const payload = { store, _id };

      if (isManager) {
        payload.isManager = true;
      }
      
      return jwt.sign({ data: payload }, jwtSecret, { expiresIn: expiration });
    },
  };