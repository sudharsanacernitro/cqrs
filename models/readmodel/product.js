// models/Product.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const toDecimal128 = v =>
  mongoose.Types.Decimal128.fromString(parseFloat(v).toFixed(2));
const fromDecimal128 = v => (v ? parseFloat(v.toString()) : v);

const productSchema = new Schema(
  {
    
    _id:        {type:String,required: true},
    name:       { type: String, required: true },
    description:{ type: String },
    price:      {
      type: Schema.Types.Decimal128,
      required: true,
      get:  fromDecimal128,
      set:  toDecimal128,
    },
    stock:      { type: Number, required: true, default: 0 },
  },
  {
    collection: 'products',  // ↔️ tableName in Sequelize
    timestamps: true,        // adds createdAt / updatedAt
    toJSON:   { getters: true, virtuals: false },
    toObject: { getters: true, virtuals: false },
  }
);

module.exports = mongoose.model('Product', productSchema);
