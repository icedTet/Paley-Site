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

  const hashedPassword = (await new Promise((res, rej) =>
    phas(password).hash((err, hash) => {
      if (err) {
        rej(err);
      }
      res(hash);
    })
  )) as string;
  const userCreate = await mongo
    .db("blog")
    .collection("users")
    .insertOne({ email: email.toLowerCase(), password: hashedPassword });

  const user = await mongo
    .db("blog")
    .collection("users")
    .findOne({ email: email.toLowerCase() });
  if (!user || !hashedPassword) {
    return res.status(401).send("Invalid email or password");
  }
  res.status(200).send(await Encryptions.issueUserToken(user._id));
  mongo.close();
};

export default handler;
