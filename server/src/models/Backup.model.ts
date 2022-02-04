import mongoose from "mongoose";

interface BackupAttrs {
  path: string;
}

interface BackupModel extends mongoose.Model<BackupDoc> {
  build(attrs: BackupAttrs): BackupDoc;
}

interface BackupDoc extends mongoose.Document {
  path: string;
  createdAt: string;
  updatedAt: string;
}

const BackupSchema = new mongoose.Schema(
  {
    path: { type: String, required: true },
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

BackupSchema.statics.build = (attrs: BackupAttrs) => new Backup(attrs);

const Backup = mongoose.model<BackupDoc, BackupModel>("Backup", BackupSchema);

export { Backup, BackupDoc, BackupAttrs };
