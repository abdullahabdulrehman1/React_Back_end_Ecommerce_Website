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
router.get("/test", requireSignin, isAdmin, (req, res) => {
  res
    .status(200)
    .json({ message: "Test controller working fine  protected you are admin" });
});
//protected route
router.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).json({ok: true , message: "Protected route for a user" });
}  
  );
router.get("/admin-auth", requireSignin, isAdmin, (req, res) => {
  if (res.status(200)) {
    res.status(200).json({ ok: true });
  } else res.status(404).json({ ok: false });
});
router.post("/forgot-password", forgotPasswordController);
export default router;
