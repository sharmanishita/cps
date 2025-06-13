import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

// Allowed user roles: "student" or "admin"

// Define allowed user roles as a TypeScript type
export type UserRole = "student" | "admin";

// Define the User TypeScript interface (extending Mongoose Document)
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

// Create the User Schema
const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Pre-save hook to hash the password before saving
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip if password hasn't changed

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err as Error);
  }
});

// Method to compare entered password with hashed password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Export the model
const User = mongoose.model<IUser>("User", userSchema);
export default User;


// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, 'Please provide a name.'],
//     },
//     email: {
//         type: String,
//         required: [true, 'Please provide an email.'],
//         unique: true,
//         match: [
//             /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//             'Please provide a valid email address.'
//         ]
//     },
//     password: {
//         type: String,
//         required: [true, 'Please provide a password.'],
//         minlength: 6,
//         select: false // Automatically exclude password from query results by default
//     }
// }, {
//     timestamps: true // Automatically adds createdAt and updatedAt fields
// });

// // Middleware to hash the password before saving a new user document
// userSchema.pre('save', async function (next) {
//     // Only run this function if password was actually modified
//     if (!this.isModified('password')) {
//         return next();
//     }

//     // Generate a salt and hash the password
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;