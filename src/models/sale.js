import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    date: { type: "string", required: true },
    items: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Items",
    },
  },
  {
    timestamps: true,
  }
);
const Sales = mongoose.models.Sales || mongoose.model("Sales", saleSchema);

export default Sales;
