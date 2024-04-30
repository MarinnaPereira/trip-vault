import jwt from 'jsonwebtoken';

import User from '../models/User.js';

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user || !user._id.equals(decoded.userId)) {
      throw new Error();
    }

    console.log('token verified');
    req.userInfo = user; //! necessary?
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Unauthorized' });
  }
};

export default verifyToken;
