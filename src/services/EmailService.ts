import { Types } from 'mongoose';
import { User } from '../models';

class EmailService {
  async verify(id: Types.ObjectId) {
    const result = await User.findByIdAndUpdate(id, { verify: true, verificationToken: null }, { new: true }).exec();

    return result || null;
  }
}

export default new EmailService();
