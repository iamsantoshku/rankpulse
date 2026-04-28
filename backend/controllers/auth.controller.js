import { registerUser, loginUser } from "../services/auth.service.js";

// ✅ Register
export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      msg: "User registered",
      user
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// ✅ Login
export const login = async (req, res) => {
  try {
    const { user, accessToken, refreshToken } =
      await loginUser(req.body);

    res.json({
      user,
      accessToken,
      refreshToken
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};