import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

// Interface for the decoded JWT payload
interface JwtPayload {
  id: string;
  email: string;
  role: "student" | "admin";
}

/**
 * Middleware: verifyToken
 * --------------------------------
 * Validates the JWT token from the request header.
 * If valid, attaches decoded user info to req.user.
 * If invalid or missing, responds with 401 Unauthorized.
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // Send 401 and exit middleware without returning the response object
    res.status(401).json({ message: "Access token missing or malformed" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next(); // Proceed to next middleware or route handler
  } catch (err) {
    console.error("JWT Verification Error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
};

/**
 * Middleware Factory: allowRoles
 * --------------------------------
 * Accepts allowed roles and returns a middleware that restricts access to them.
 * Used after verifyToken to ensure only authorized users proceed.
 * 
 * Example: allowRoles("admin"), allowRoles("student", "admin")
 */
export const allowRoles = (...allowedRoles: ("student" | "admin")[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    // Check if user info is present and role is allowed
    if (!user || !allowedRoles.includes(user.role)) {
      res.status(403).json({ message: "You are not authorized to access this resource" });
      return;
    }

    next(); // User has required role, proceed
  };
};


// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');

// /**
//  * Protects routes by verifying the JWT from the Authorization header.
//  * @param {object} req - Express request object.
//  * @param {object} res - Express response object.
//  * @param {function} next - Express next middleware function.
//  */
// const protect = async (req, res, next) => {
//     let token;

//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         try {
//             // Extracts the token from the "Bearer <token>" string
//             token = req.headers.authorization.split(' ')[1];

//             // Verifies the token using the secret key
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);

//             // Attaches the user's information to the request object, excluding the password
//             req.user = await User.findById(decoded.user.id).select('-password');
            
//             if (!req.user) {
//                 return res.status(401).json({ message: 'Not authorized, user not found.' });
//             }

//             // Proceeds to the next middleware or route handler
//             next();

//         } catch (error) {
//             return res.status(401).json({ message: 'Not authorized, token is invalid or expired.' });
//         }
//     }

//     if (!token) {
//         return res.status(401).json({ message: 'Not authorized, no token was provided.' });
//     }
// };

// module.exports = { protect };