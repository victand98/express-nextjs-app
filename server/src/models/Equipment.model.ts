import mongoose from "mongoose";
import { UserDoc } from "./User.model";

interface EquipmentAttrs {
  brand: string;
  model: string;
  type: string;
  serial: string;
  vlan: string;
  ip: string;
  location: string;
  user?: UserDoc;
}

interface EquipmentModel extends mongoose.Model<EquipmentDoc> {
  build(attrs: EquipmentAttrs): EquipmentDoc;
}

interface EquipmentDoc extends mongoose.Document {
  brand: string;
  model: string;
  type: string;
  serial: string;
  vlan: string;
  ip: string;
  location: string;
  user: UserDoc;
  createdAt: string;
  updatedAt: string;
}

const EquipmentSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    type: { type: String, required: true },
    serial: { type: String, required: true },
    vlan: { type: String, required: true },
    ip: { type: String, required: true },
    location: { type: String, required: true },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
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

EquipmentSchema.statics.build = (attrs: EquipmentAttrs) => new Equipment(attrs);

const Equipment = mongoose.model<EquipmentDoc, EquipmentModel>(
  "Equipment",
  EquipmentSchema
);

export { Equipment, EquipmentDoc, EquipmentAttrs };
