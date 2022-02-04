import { Express } from "express";
import { authRouter } from "./auth.routes";
import { backupRouter } from "./backup.routes";
import { equipmentRouter } from "./equipment.routes";
import { roleRouter } from "./role.routes";
import { userRouter } from "./user.routes";

export default (app: Express) => {
  app.use("/auth", authRouter);
  app.use("/backup", backupRouter);
  app.use("/equipment", equipmentRouter);
  app.use("/role", roleRouter);
  app.use("/user", userRouter);
};
