import { NextApiRequest, NextApiResponse } from "next";
import { withMongo } from "../../../../utils/mongoFunctions";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { postID } = req.query;
  if (!postID) {
    return res.status(400).json({
      statusCode: 400,
      message: "No Post ID provided",
    });
  }
  const mongo = await withMongo();
  const post = await mongo
    .db("blog")
    .collection("posts")
    .findOne({ id: postID });
  if (!post) {
    return res.status(404).json({
      statusCode: 404,
      message: "Post not found",
    });
  }
  res.status(200).json(post);
  mongo.close();
};

export default handler;
