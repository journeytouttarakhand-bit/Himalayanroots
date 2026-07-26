import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "HimalayanRootsSecretKey";

export async function hashPassword(
  password: string
) {
  return await bcrypt.hash(
    password,
    10
  );
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  return await bcrypt.compare(
    password,
    hashedPassword
  );
}

export function generateToken(
  id: string,
  role: string
) {
  return jwt.sign(
    {
      id,
      role,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

export function verifyToken(
  token: string
) {
  try {
    return jwt.verify(
      token,
      JWT_SECRET
    );
  } catch {
    return null;
  }
}