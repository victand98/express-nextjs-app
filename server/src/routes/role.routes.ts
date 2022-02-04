import express from "express";
import { roleController } from "../controllers";
import { use } from "../helpers/utils";
import { requireAuth } from "../middlewares/require-auth";

const roleRouter = express.Router();

roleRouter.get("/", requireAuth, use(roleController.all));
roleRouter.get("/:name", requireAuth, use(roleController.one));

export { roleRouter };
