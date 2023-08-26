import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    ingredients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredients",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Inventory =
  mongoose.models.Inventory || mongoose.model("Inventory", inventorySchema);

export default Inventory;
