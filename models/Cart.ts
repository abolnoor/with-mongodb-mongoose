import mongoose from "mongoose";

export interface Carts extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  items:
  {
    productId: mongoose.Schema.Types.ObjectId,
    quantity: number
  }[],
  compound: string;
  gate: string;
  status: string;
  totalAmount: number;
}

/* CartSchema will correspond to a collection in your MongoDB database. */
const CartSchema = new mongoose.Schema<Carts>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, min: 1 }
    }
  ],
  compound: { type: String }, // إضافة الحقل
  gate: { type: String }, // إضافة الحقل
  status: { type: String, enum: ["قيد التنفيذ", "مكتمل", "ملغى"], default: "قيد التنفيذ" }, // إضافة الحقل
  totalAmount: { type: Number, required: true }
});

export default mongoose.models.Cart || mongoose.model<Carts>("Cart", CartSchema);
