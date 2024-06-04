export const sanitizeUserToUpdate = (req, res, next) => {
  const user = req.userInfo;
  let { body } = req;
  const wholeUser = {
    username: body.username || user.username,
    email: user.email,
    password: body.password || user.password,
    avatar: body.avatar || user.avatar,
    selectedTrip: body.selectedTrip || user.selectedTrip,
  };
  req.body = wholeUser;
  next();
};
