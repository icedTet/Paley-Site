import { NextApiRequest, NextApiResponse } from "next";
import { withMongo } from "../../../utils/mongoFunctions";
import phas from "password-hash-and-salt";
import { Encryptions } from "../../../utils/Encryptions";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }
  const { email, password } = req.body as { email: string; password: string };
  if (!email || !password) {
    return res.status(400).send("Email and password required");
  }
  const mongo = await withMongo();
  const user = await mongo
    .db("blog")
    .collection("users")
    .findOne({ email: email.toLowerCase() });
  const hashedPassword = (await new Promise((res, rej) =>
    phas(password).verifyAgainst(user?.password, (err, verified) => {
      if (err) {
        rej(err);
      }
      res(verified);
    })
  )) as boolean;
  if (!user || !hashedPassword) {
    return res.status(401).send("Invalid email or password");
  }
  res.status(200).send(await Encryptions.issueUserToken({ id: user._id }));
  // if (!post) {
  //   return res.status(404).json({
  //     statusCode: 404,
  //     message: "Post not found",
  //   });
  // }
  // res.status(200).json(post);
  mongo.close();
};

export default handler;
