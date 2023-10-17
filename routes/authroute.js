import { Router } from "express";
import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
} from "../controller/registerController.js";
import { testController } from "../middelwares/authMiddleware.js";
import { isAdmin, requireSignin } from "../middelwares/authMiddleware.js";

const router = express.Router();
router.post("/register", registerController);
router.post("/login", loginController);

//test routeswhat
//test routeswhat
router.get("/test", requireSignin, isAdmin, testController);
//protected route
router.get("/user-auth", requireSignin, (req, res) => {
  
  res.status(200).json({ ok: true });
  // res.status(404).json({ ok: false });
});
router.post("/forgot-password", forgotPasswordController);
export default router;
