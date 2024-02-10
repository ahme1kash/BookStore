import jwt from 'jsonwebtoken';
// Middleware to verify JWT token and extract user information
const auth_middleware = {
authenticateUser :(req, res, next) => {
    try {
    //   console.log(req.headers.authorization)
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token missing' });
      }
  
      const decodedToken = jwt.verify(token, process.env.SECRET);
      if (!decodedToken) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }
  
      req.user_id = decodedToken.id;
      req.role = decodedToken.role;
      res.json(decodedToken)
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

}
 export default auth_middleware;