import { NextApiRequest, NextApiResponse } from "next";
import { withMongo } from "../../../utils/mongoFunctions";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const mongo = await withMongo();
  const posts = await mongo
    .db("blog")
    .collection("posts")
    .find({})
    .limit(Number(req.query.limit) ?? 50)
    .toArray();
  res.status(200).json(posts);
  mongo.close();
};

export default handler;
