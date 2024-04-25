import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const { hash, compare } = bcrypt;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true }, // name of the avatar
  trips: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
  selectedTrip: { type: Schema.Types.ObjectId, ref: "Trip" },
});

userSchema.statics.register = async (data) => {
  const hashed = await hash(data.password, 10);
  data.password = hashed;
  return User.create(data);
};

userSchema.statics.login = async (data) => {
  const user = await User.findOne({ username: data.username });
  if (!user) return false;
  const match = await compare(data.password, user.password);
  if (!match) {
    return false;
  }
  return user;
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
};

export default model("User", userSchema);
