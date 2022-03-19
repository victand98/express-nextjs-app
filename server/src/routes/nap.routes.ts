import express from "express";
import { napController } from "../controllers";
import { Resources } from "../helpers/types";
import { use } from "../helpers/utils";
import { authorization } from "../middlewares/authorization";
import { requireAuth } from "../middlewares/require-auth";

const napRouter = express.Router();

napRouter.get(
  "/",
  requireAuth,
  authorization(Resources.nap),
  use(napController.all)
);
napRouter.get(
  "/:id",
  requireAuth,
  authorization(Resources.nap),
  use(napController.one)
);
napRouter.post(
  "/",
  requireAuth,
  authorization(Resources.nap),
  use(napController.save)
);
napRouter.put(
  "/:id",
  requireAuth,
  authorization(Resources.nap),
  use(napController.update)
);

export { napRouter };
