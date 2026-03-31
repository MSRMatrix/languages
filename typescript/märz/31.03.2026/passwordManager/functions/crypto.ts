import { scryptSync, randomBytes, createCipheriv, createDecipheriv } from "crypto";
const salt = randomBytes(16);

export function createKey(masterPassword: string) {
  return scryptSync(masterPassword, salt, 32);
}



export function encrypt(text: string, key: Buffer) {
  const iv = randomBytes(16); 

  const cipher = createCipheriv("aes-256-cbc", key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return {
    value: encrypted,
    iv: iv.toString("hex"),
  };
}



export function decrypt(encryptedData: string, ivHex: string, key: Buffer) {
  const iv = Buffer.from(ivHex, "hex");

  const decipher = createDecipheriv("aes-256-cbc", key, iv);

  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}