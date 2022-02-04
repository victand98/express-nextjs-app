import express from "express";
import { authController } from "../controllers";
import { use } from "../helpers/utils";

const authRouter = express.Router();

authRouter.post("/signin", use(authController.signin));
authRouter.post("/logout", use(authController.logout));
authRouter.get("/current/user", use(authController.currentUser));
authRouter.get("/current/permissions", use(authController.currentPermissions));

export { authRouter };
