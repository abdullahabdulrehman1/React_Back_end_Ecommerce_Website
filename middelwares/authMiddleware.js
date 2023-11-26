import JWT from "jsonwebtoken";
import usermodel from "../models/usermodel.js";

export const requireSignin = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ ok: false, message: "Unauthorized: No token provided" });
    }
    const decoded = JWT.verify(token, process.env.JSON_WEB);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(`Error: JWT here ERROR ${error.message}`);
    res.status(401).json({ ok: false, message: "Unauthorized: Invalid token" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await usermodel.findById(req.user.id);
    console.log(user.role);
    if (!user) {
      return res
        .status(401)
        .json({ ok: false, message: "Unauthorized: Invalid token" });
    }

    if (Number(user.role) === 1) {
      console.log("Admin access granted");
      next();
    } else {
      console.log("You are not admin ");
      return res.status(403).json({ ok: false, message: "You are not admin" });
    }
  } catch (error) {
    console.log(`Error: isAdmin ERROR ${error.message}`);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

export const testController = async (req, res) => {
  console.log(`test controller ${res.user}`);
  res
    .status(200)
    .json({ message: "Test controller working fine  protected you are admin" });
};

export default { requireSignin, isAdmin, testController };
