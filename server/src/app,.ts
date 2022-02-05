import express from "express";
import "express-async-errors";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import cookieSession from "cookie-session";
import routes from "./routes";
import { ErrorHandler } from "./middlewares/error-handler";
import { currentUser } from "./middlewares/current-user";
import { NotFoundError } from "./helpers/errors/not-found.error";

const app = express();

app.set("trust proxy", true);
app.set("port", process.env.PORT || 3000);

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
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

app.use(ErrorHandler);

export { app };
