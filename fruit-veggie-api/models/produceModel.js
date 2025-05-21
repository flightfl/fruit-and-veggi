const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema(
  {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number
  },
  { _id: false }
);

const produceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    category: {
      type: String,
      required: true,
      enum: ['fruit', 'vegetable']
    },
    imageUrl: String,
    nutrition: nutritionSchema,
    translations: {
      type: Map,
      of: String
    },
    aiInsights: [String]
  },
  { timestamps: true }
);

const Produce = mongoose.model('Produce', produceSchema);

module.exports = Produce;