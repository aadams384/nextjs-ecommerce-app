import { getToken } from 'next-auth/jwt';
import db from '../../../../../utils/db';
import Order from '../../../../../utils/models/order';

const handler = async (req, res) => {
  const user = getToken({ req });
  if (!user) {
    return res.status(401).send('Unauthorized');
  }
  await db.connectDB();

  const order = await Order.findById(req.query.id);
  await db.disconnect();
  res.send(order);
};

export default handler;
