import express from "express";
import { equipmentController } from "../controllers";
import { Resources } from "../helpers/types";
import { use } from "../helpers/utils";
import { authorization } from "../middlewares/authorization";
import { requireAuth } from "../middlewares/require-auth";

const equipmentRouter = express.Router();

equipmentRouter.get("/", use(equipmentController.all));
equipmentRouter.get("/:id", use(equipmentController.one));
equipmentRouter.post(
  "/",
  requireAuth,
  authorization(Resources.equipment),
  use(equipmentController.save)
);
equipmentRouter.put(
  "/:id",
  requireAuth,
  authorization(Resources.equipment),
  use(equipmentController.update)
);

equipmentRouter.delete(
  "/:id",
  requireAuth,
  authorization(Resources.equipment),
  use(equipmentController.remove)
);

export { equipmentRouter };
