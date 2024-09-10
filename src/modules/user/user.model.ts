import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import { role } from "./user.constant";
import bcrypt from "bcrypt";
const saltRounds = 10;
const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: {
      type: String,
      enum: {
        values: role,
      },
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(saltRounds));
  next();
});
userSchema.post("save", function (doc: any, next) {
  delete doc._doc.password;
  delete doc._doc.isDeleted;
  next();
});

userSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await User.findOne({
    _id: id,
    isDeleted: { $ne: true },
  });
  return existingUser;
};

export const User = model<TUser>("User", userSchema);
