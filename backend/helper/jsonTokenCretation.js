const jwt = require("jsonwebtoken");

const createJsonWebToken = async (payload, secretKey, expiryTime) => {
  if (
    typeof payload !== "object" ||
    !payload ||
    Object.keys(payload).length === 0
  ) {
    console.log();
    throw new Error("Payload must be a non empty object");
  }
  if (typeof secretKey !== "string" || !secretKey) {
    throw new Error("Secret key must be a non empty string.");
  }

  try {
    const token = await jwt.sign(payload, secretKey, { expiresIn: expiryTime });
    return token;
  } catch (err) {
    console.error("Failed to sign the JWT :", err);
    throw err;
  }
};

module.exports = { createJsonWebToken };
