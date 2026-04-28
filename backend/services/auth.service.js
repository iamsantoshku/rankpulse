import User from "../models/usermodels.js";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken
} from "../utils/generateToken.js";

export const registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed
  });

  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Invalid password");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
};