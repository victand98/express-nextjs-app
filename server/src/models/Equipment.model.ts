import mongoose from "mongoose";
import { Plans } from "../helpers/types";
import { NapDoc } from "./Nap.model";
import { UserDoc } from "./User.model";

interface EquipmentAttrs {
  number: number;
  brand: string;
  model: string;
  type: string;
  serial: string;
  vlan: string;
  ip: string;
  plan: Plans;
  user?: UserDoc;
  nap?: NapDoc;
  status: boolean;
}

interface EquipmentModel extends mongoose.Model<EquipmentDoc> {
  build(attrs: EquipmentAttrs): EquipmentDoc;
}

interface EquipmentDoc extends mongoose.Document {
  number: number;
  brand: string;
  model: string;
  type: string;
  serial: string;
  vlan: string;
  ip: string;
  plan: Plans;
  user: UserDoc;
  nap: NapDoc;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

const EquipmentSchema = new mongoose.Schema(
  {
    number: { type: Number, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    type: { type: String, required: true },
    serial: { type: String, required: true },
    vlan: { type: String, required: true },
    ip: { type: String, required: true },
    plan: { type: String, enum: Object.values(Plans), required: true },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    nap: {
      type: mongoose.Types.ObjectId,
      ref: "Nap",
    },
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

EquipmentSchema.statics.build = (attrs: EquipmentAttrs) => new Equipment(attrs);

const Equipment = mongoose.model<EquipmentDoc, EquipmentModel>(
  "Equipment",
  EquipmentSchema
);

export { Equipment, EquipmentDoc, EquipmentAttrs };
