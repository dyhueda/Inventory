import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number },
  },
  {
    timestamps: true,
  }
);
const Ingredients =
  mongoose.models.Ingredients ||
  mongoose.model("Ingredients", ingredientSchema);

export default Ingredients;
