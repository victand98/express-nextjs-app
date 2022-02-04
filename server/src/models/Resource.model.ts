import mongoose from "mongoose";
import { Resources } from "../helpers/types";
import { RoleDoc } from "./Role.model";

interface RolesAttrs {
  role: RoleDoc;
  create: boolean;
  update: boolean;
  delete: boolean;
  read: boolean;
}

interface ResourceAttrs {
  name: Resources;
  status: boolean;
  roles: RolesAttrs[];
}

interface ResourceModel extends mongoose.Model<ResourceDoc> {
  build(attrs: ResourceAttrs): ResourceDoc;
}

interface ResourceDoc extends mongoose.Document {
  name: Resources;
  status: boolean;
  roles: RolesAttrs[];
  createdAt: string;
  updatedAt: string;
}

const ResourceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, enum: Object.values(Resources) },
    status: {
      type: Boolean,
      default: true,
    },
    roles: [
      {
        role: {
          type: mongoose.Types.ObjectId,
          ref: "Role",
          required: true,
        },
        create: { type: Boolean },
        delete: { type: Boolean },
        update: { type: Boolean },
        read: { type: Boolean },
      },
    ],
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

ResourceSchema.statics.build = (attrs: ResourceAttrs) => new Resource(attrs);

const Resource = mongoose.model<ResourceDoc, ResourceModel>(
  "Resource",
  ResourceSchema
);

export { Resource, ResourceDoc, RolesAttrs };
