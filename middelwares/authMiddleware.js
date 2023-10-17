import JWT from "jsonwebtoken";
import usermodel from "../models/usermodel.js";

export const requireSignin = (req, res, next) => {
  try {
    const decode = JWT.verify(req.headers.authorization, process.env.JSON_WEB);
    console.log(`protected route ${decode}`);
    console.log(req.headers.authorization);
    req.user = decode;
    next();
  } catch (error) {
    console.log(`Error: JWT here ERROR ${error.message}`);
    res.status(401).json({ message: "Unauthorized" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await usermodel.findById(req.user.id);
    if (!user || user.role === 0) {
      return res.status(403).json({ message: "You are not authorized to access this resource" });
    }
    next();
    // res.status(200).json({ message: "Admin access granted" });
  } catch (error) {
    console.log(`Error: isAdmin ERROR ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const testController = async (req, res) => {
  console.log(`test controller ${req.user}`);
  res.status(200).json({ message: "Test controller working fine  protected" });
};

export default { requireSignin, isAdmin, testController };
