import Order from '../../../../utils/models/order';
import db from '../../../../utils/db';
import { getToken } from 'next-auth/jwt';
import mongoose from 'mongoose';

const handler = async (req, res) => {
  const user = getToken({ req });
  if (!user) {
    return res.status(401).send('signin required');
  }

  await db.connectDB();
  const newOrder = new Order({
    ...req.body,
    user: new mongoose.Types.ObjectId(),
  });

  const order = await newOrder.save();
  res.status(201).send(order);
};
export default handler;
