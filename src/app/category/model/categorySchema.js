const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    categoryName: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
