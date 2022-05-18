import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Encryptions } from "../../../utils/Encryptions";
import { withMongo } from "../../../utils/mongoFunctions";
import { sampleUserData } from "../../../utils/sample-data";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userID } = req.query;
  if (!userID) {
    return res.status(400).json({
      statusCode: 400,
      message: "No user ID provided",
    });
  }
  const mongo = await withMongo();
  if (userID.toString().toLowerCase() === "@me") {
    if (!req.headers.authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        statusCode: 401,
        message: "No authorization header provided",
      });
    }
    const userID = (await Encryptions.decrypt(
      req.headers.authorization.substring(7)
    ).then((x) => (x as any).data.userID.id)) as string;
    if (!userID) {
      return res.status(401).json({
        statusCode: 401,
        message: "Invalid authorization header",
      });
    }
    const user = await mongo
      .db("blog")
      .collection("users")
      .findOne({ _id: new ObjectId(userID as string) });
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: "User not found",
      });
    }
    res.status(200).json(user);
    return;
  }
  const user = await mongo
    .db("blog")
    .collection("users")
    .findOne({ _id: new ObjectId(userID as string) });
  if (!user) {
    return res.status(404).json({
      statusCode: 404,
      message: "User not found",
    });
  }
  delete user.password;
  delete user.email;
  res.status(200).json(user);
  mongo.close();
};

export default handler;
