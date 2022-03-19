import mongoose from "mongoose";
import { Password } from "../helpers/Password";
import { RoleDoc } from "./Role.model";

interface UserAttrs {
  username: string;
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  password: string;
  role: RoleDoc;
  status: boolean;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  username: string;
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  password: string;
  role: RoleDoc;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dni: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: mongoose.Types.ObjectId, ref: "Role", required: true },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
  }
);

UserSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const passwordHashed = await Password.toHash(this.get("password"));
    this.set("password", passwordHashed);
  }
  done();
});

UserSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

const User = mongoose.model<UserDoc, UserModel>("User", UserSchema);

export { User, UserDoc, UserAttrs };
