import { NextApiRequest, NextApiResponse } from 'next'
import { withMongo } from '../../../utils/mongoFunctions'
import { sampleUserData } from '../../../utils/sample-data'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {userID} = req.query
  if (!userID) {
    return res.status(400).json({
      statusCode: 400,
      message: 'No user ID provided'
    })
  }
  const mongo = await withMongo();
  const user = await mongo.db('blog').collection('users').findOne({_id: userID})
  if (!user) {
    return res.status(404).json({
      statusCode: 404,
      message: 'User not found'
    })
  }
  delete user.password
  delete user.email
  res.status(200).json(user)
  mongo.close();
}

export default handler
