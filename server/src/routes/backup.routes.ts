import express from "express";
import { upload } from "../config/multer";
import { backupController } from "../controllers";
import { Resources } from "../helpers/types";
import { use } from "../helpers/utils";
import { authorization } from "../middlewares/authorization";
import { requireAuth } from "../middlewares/require-auth";

const backupRouter = express.Router();

backupRouter.get(
  "/",
  requireAuth,
  authorization(Resources.backup),
  use(backupController.all)
);
backupRouter.get(
  "/:id",
  requireAuth,
  authorization(Resources.backup),
  use(backupController.one)
);
backupRouter.post(
  "/",
  requireAuth,
  authorization(Resources.backup),
  upload.single("backupFile"),
  use(backupController.save)
);
backupRouter.put(
  "/:id",
  requireAuth,
  authorization(Resources.backup),
  use(backupController.update)
);
backupRouter.post(
  "/generate",
  requireAuth,
  authorization(Resources.backup),
  use(backupController.generate)
);

export { backupRouter };
