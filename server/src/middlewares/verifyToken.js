import jwt from 'jsonwebtoken';

import User from '../models/User.js';

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user || !user._id.equals(decoded.userId)) {
      throw new Error('User not authenticated');
    }

    if (!user.selectedTrip) {
      throw new Error('No active trip for this user');
    }

    console.log('token verified');
    req.userInfo = user; //! necessary?
    req.tripId = user.selectedTrip._id;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Unauthorized', error: error.message });
  }
};

export default verifyToken;
