import User from '../../../utils/models/user';
import Product from '../../../utils/models/product';
import db from '../../../utils/db';
import data from '../../../utils/data';

const handler = async (req, res) => {
  await db.connectDB();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await db.disconnect();
  res.send({ message: 'database seeded successfully' });
};

export default handler;
