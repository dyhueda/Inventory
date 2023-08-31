import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    ingredients: [
      {
        ingredient: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Ingredients",
        },
        quantity: { type: Number },
        measure: {type: String},
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Items = mongoose.models.Items || mongoose.model("Items", itemSchema);

export default Items;
