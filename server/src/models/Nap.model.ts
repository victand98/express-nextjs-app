import mongoose from "mongoose";

interface NapAttrs {
  name: string;
  location: string;
  status: boolean;
}

interface NapModel extends mongoose.Model<NapDoc> {
  build(attrs: NapAttrs): NapDoc;
}

interface NapDoc extends mongoose.Document {
  name: string;
  location: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

const NapSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    location: { type: String, required: true },
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

NapSchema.statics.build = (attrs: NapAttrs) => new Nap(attrs);

const Nap = mongoose.model<NapDoc, NapModel>("Nap", NapSchema);

export { Nap, NapDoc, NapAttrs };
