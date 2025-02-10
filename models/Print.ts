import mongoose from "mongoose";

export interface Files extends mongoose.Document {
  fileName: string;
  colorMode: string;
  size: string;
  face: string;
  slides: string;
  paperType: string;
  copies: number;
  rangeOption: string;
  rangeFrom: number;
  rangeTo: number;
  services: string[];
  price: number;
  pageCount: number;
}

export interface Prints extends mongoose.Document {
  files: Files[], // بيانات الملفات وخصائص الطباعة
  notes: string;
  totalPrice: number;
}

/* FileSchema will correspond to a collection in your MongoDB database. */
const FileSchema = new mongoose.Schema<Files>({
  fileName: { type: String },
  colorMode: { type: String },
  size: { type: String },
  face: { type: String },
  slides: { type: String },
  paperType: { type: String },
  copies: { type: Number },
  rangeOption: { type: String },
  rangeFrom: { type: Number },
  rangeTo: { type: Number },
  services: { type: [String] },
  price: { type: Number },
  pageCount: { type: Number } 
});

/* PrintSchema will correspond to a collection in your MongoDB database. */
const PrintSchema = new mongoose.Schema<Prints>({
  files: [FileSchema], // بيانات الملفات وخصائص الطباعة
  notes: {type: String},
  totalPrice: { type: Number, default: 0 }
},
{ timestamps: true });

export default mongoose.models.Print || mongoose.model<Prints>("Print", PrintSchema);
