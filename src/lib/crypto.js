import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "./config";
export function encryptAES(str = "") {
  const algorithm = "AES-256-CTR";
  const PASSWORD = Buffer.from(config.crypto.aes_password, "ascii");
  const IV = Buffer.from(config.crypto.aes_iv);
  let cipher = crypto.createCipheriv(algorithm, PASSWORD, IV);
  let encrypted = cipher.update(str, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

export function decryptAES(str = "") {
  try {
    const algorithm = "AES-256-CTR";
    const PASSWORD = Buffer.from(config.crypto.aes_password, "ascii");
    const IV = Buffer.from(config.crypto.aes_iv);
    let decipher = crypto.createDecipheriv(algorithm, PASSWORD, IV);
    let dec = decipher.update(str, "hex", "utf8");
    dec += decipher.final("utf8");
    return dec ? dec : str;
  } catch (e) {
    return str;
  }
}

export function generatePairToken(data) {
  const access_token = jwt.sign(data, config.jwt.token_secret, {
    algorithm: config.jwt.algorithms,
    expiresIn: config.jwt.token_life,
  }, null);

  const refresh_token = jwt.sign(data, config.jwt.refresh_token_secret, {
    algorithm: config.jwt.algorithms,
    expiresIn: config.jwt.refresh_token_life,
  }, null);
  return {
    access_token,
    refresh_token,
  };
}

export function verifyToken(token, type) {
    try {
        return jwt.verify(token, config.jwt[type], {
            algorithm: config.jwt.algorithms
        }, null);
    } catch (error) {
        return false;
    }
}
