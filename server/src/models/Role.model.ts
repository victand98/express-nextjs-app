import mongoose from "mongoose";
import { Roles } from "../helpers/types";

interface RoleAttrs {
  name: Roles;
  status: boolean;
}

interface RoleModel extends mongoose.Model<RoleDoc> {
  build(attrs: RoleAttrs): RoleDoc;
}

interface RoleDoc extends mongoose.Document {
  name: Roles;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

const RoleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, enum: Object.values(Roles) },
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
      },
    },
  }
);

RoleSchema.statics.build = (attrs: RoleAttrs) => new Role(attrs);

const Role = mongoose.model<RoleDoc, RoleModel>("Role", RoleSchema);

export { Role, RoleDoc };
