import express from "express";
import { userController } from "../controllers";
import { Resources } from "../helpers/types";
import { use } from "../helpers/utils";
import { authorization } from "../middlewares/authorization";
import { requireAuth } from "../middlewares/require-auth";

const userRouter = express.Router();

userRouter.get("/", requireAuth, use(userController.all));
userRouter.get(
  "/:id",
  requireAuth,
  authorization(Resources.users),
  use(userController.one)
);
userRouter.post(
  "/",
  requireAuth,
  authorization(Resources.users),
  use(userController.save)
);
userRouter.put(
  "/:id",
  requireAuth,
  authorization(Resources.users),
  use(userController.update)
);
userRouter.delete(
  "/:id",
  requireAuth,
  authorization(Resources.users),
  use(userController.remove)
);

export { userRouter };
