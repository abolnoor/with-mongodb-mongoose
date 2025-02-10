import mongoose from "mongoose";

export interface Products extends mongoose.Document {
  _id: any;
  name: string;
  price: number;
  image: string;
}

/* ProductSchema will correspond to a collection in your MongoDB database. */
const ProductSchema = new mongoose.Schema<Products>({
  name: { type: String, required: [true, "Required"] },
  price: { type: Number, required: [true, "Required"] },
  image: { type: String, required: [true, "Required"] }
});

export default mongoose.models.Product || mongoose.model<Products>("Product", ProductSchema);
