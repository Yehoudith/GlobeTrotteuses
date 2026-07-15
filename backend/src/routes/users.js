import express from "express";
import {
  CheckEmail,
  CreateUsers,
} from "../controllers/users.js";

const usersRouter = express.Router();

usersRouter.post("/check-email", CheckEmail);
usersRouter.post("/create-user", CreateUsers);

export default usersRouter;