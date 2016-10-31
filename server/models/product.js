import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productPhotoSchema = new Schema({
  fileName: { type: 'String', required: true },
});

const productColorSchema = new Schema({
  cuid: { type: 'String', required: true },
  code: { type: 'String', required: true },
  sourceProductLink: { type: 'String' },
  isSale: { type: 'Boolean', required: true, default: false },
  inactive: { type: 'Boolean', required: true, default: false },
  photos: [productPhotoSchema]
});

const productSchema = new Schema({
  name: { type: 'String', required: true },
  code: { type: 'String', required: true },
  description: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  price: { type: 'Number', required: true },
  colors: [productColorSchema],
  category: { type: 'String' },
  group: { type: 'String' },
  defaultColor: { type: 'String', required: true },
  isSale: { type: 'Boolean', required: true, default: false },
  inactive: { type: 'Boolean', required: true, default: false }
});

export default mongoose.model('Product', productSchema);
