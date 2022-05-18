import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Encryptions } from "../../../../utils/Encryptions";
import { withMongo } from "../../../../utils/mongoFunctions";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { postID } = req.query;
  if (!postID) {
    return res.status(400).json({
      statusCode: 400,
      message: "No Post ID provided",
    });
  }
  if (postID.toString().toLowerCase() === "@create" && req.method === "POST") {
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
    const info = req.body;
    if (!info.title || !info.content) {
      return res.status(400).json({
        statusCode: 400,
        message: "No title or content provided",
      });
    }
    const mongo = await withMongo();
    const postObj = {
      title: info.title,
      markdown: info.content,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      id: Date.now()
        .toString(36)
        .concat((Math.random() * 99999).toString(36)),
      author: userID,
      tags: info.tags || [],
    };
    const post = await mongo.db("blog").collection("posts").insertOne(postObj);
    res.status(200).json(postObj);
    mongo.close();

    return;
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
