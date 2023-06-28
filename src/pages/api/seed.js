import User from '../../../models/user';
import db from '../../../utils/db';
import data from '../../../utils/data';

const handler = async (req, res) => {
  await db.connectDB();
  await User.deleteMany();
  await User.insertMany(data.users);
  await db.disconnect();
  res.send({ message: 'database seeded successfully' });
};

export default handler;
