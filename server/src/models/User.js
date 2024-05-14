import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const { hash, compare } = bcrypt;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  selectedTrip: { type: Schema.Types.ObjectId, ref: 'Trip' },
});

userSchema.statics.register = async data => {
  const hashed = await hash(data.password, 10);
  data.password = hashed;
  console.log(data.password);
  return await User.create(data);
};

userSchema.statics.login = async data => {
  const user = await User.findOne({
    $or: [{ username: data.credential }, { email: data.credential }],
  }).populate('selectedTrip');
  if (!user) return false;
  const match = await compare(data.password, user.password);
  if (!match) {
    return false;
  }
  console.log(user);
  return user;
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
};

const User = model('User', userSchema);
export default User;
