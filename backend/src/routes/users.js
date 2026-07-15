import express from "express";
import {
  CheckEmail,
  CreateUsers,
} from "../controllers/users.js";

const router = express.Router();

router.post("/check-email", CheckEmail);
router.post("/create-user", CreateUsers);

export default router;