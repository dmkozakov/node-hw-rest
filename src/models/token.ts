import { Schema, model } from 'mongoose';
import { handleMongooseError } from '../helpers';

const tokenSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String, required: true },
  },
  { versionKey: false, timestamps: true },
);

tokenSchema.post('save', { errorHandler: true }, handleMongooseError);

const Token = model('Token', tokenSchema);

export default Token;
