import jwt from "jsonwebtoken";
export enum UserTokenTypes {
  USER = 0,
  OAUTH = 1,
}
export class Encryptions {
  /**
   * Signs a payload with the JWT secret
   * @param {string|object|Buffer} payload
   * @return {Promise<String>}
   */
  static encrypt(payload: string | object | Buffer) {
    return new Promise((res, rej) =>
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { algorithm: "RS512" },
        (er, encrypted) => (er ? rej(er) : res(encrypted))
      )
    ) as Promise<string>;
  }
  /**
   * Decrypts a payload with the JWT secret
   * @param {string} encryptedPayload
   * @return {Promise<string|object|Buffer>}
   */
  static decrypt(encryptedPayload: string) {
    return new Promise((res, rej) =>
      jwt.verify(
        encryptedPayload,
        process.env.JWT_SECRET,
        { algorithms: ["RS512"], ignoreExpiration: true },
        (er, decrypted) => (er ? rej(er) : res(decrypted))
      )
    );
  }
  /**
   * Issues a JWT token with the userID. Expires in 2 weeks or whatever specified in seconds
   * @param {string} userID
   * @param {number} expiration
   * @return {Promise<string>}
   */
  static issueUserToken(userID: any, expiration = 1209600) {
    let payload = {
      data: {
        tokenType: UserTokenTypes.USER,
        userID: userID,
      },
      exp: Math.floor(Date.now() / 1000) + expiration,
    };
    return this.encrypt(payload);
  }
}
/**
 * @typedef {Object} UserPayload
 * @property {string} userID
 * @property {number} tokenType
 */
