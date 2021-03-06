import cookieSession from "cookie-session";
import cors from "cors";
import express from "express";
import "express-async-errors";
import morgan from "morgan";
import path from "path";
import { NotFoundError } from "./helpers/errors/not-found.error";
import log from "./helpers/logger";
import { currentUser } from "./middlewares/current-user";
import { ErrorHandler } from "./middlewares/error-handler";
import { MongoErrorHandler } from "./middlewares/mongo-error-handler";
import routes from "./routes";

const app = express();

app.set("trust proxy", true);
app.set("port", process.env.PORT || 3000);

// middlewares
app.use(
  morgan("dev", {
    stream: { write: (message: string) => log.info(message) },
  })
);
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.0.2:3000"],
    credentials: true,
  })
);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "development",
  })
);
app.use("/static", express.static(path.join(__dirname, "public")));

// verify if exists a current user
app.use(currentUser);

// app routes
routes(app);

// Not found error handler
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(MongoErrorHandler);
app.use(ErrorHandler);

export { app };
