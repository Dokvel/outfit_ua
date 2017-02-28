import mongoose from 'mongoose';
import autoIncrement from 'mongodb-autoincrement';

const Schema = mongoose.Schema;

const postSchema = new Schema({
  phone: { type: 'String', required: true },
  cart: { },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});
postSchema.plugin(autoIncrement.mongoosePlugin, {  field: 'number', });

export default mongoose.model('Order', postSchema);
