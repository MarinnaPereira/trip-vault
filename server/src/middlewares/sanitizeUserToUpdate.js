export const sanitizeUserToUpdate = (req, res, next) => {
  const user = req.userInfo;
  let { body } = req;
  console.log('user:', user);
  console.log('body:', body);

  const wholeUser = {
    username: body.username || user.username,
    email: user.email,
    password: body.password || user.password,
    avatar: body.avatar || user.avatar,
    selectedTrip: body.selectedTrip || user.selectedTrip,
  };
  console.log('whole user:', wholeUser);

  req.body = wholeUser;
  console.log('req.body:', body);
  next();
};
