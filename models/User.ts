import mongoose from "mongoose";

export interface Users extends mongoose.Document {
  password: string;
  phone: string;
  tamimahVerificationCode: string;
  isVerified: boolean;
  verificationCode: string;
  role: string;
}

/* UserSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema<Users>({
  password: { type: String, required: [true, "required"] },
  phone: { type: String, required: [true, "required"], unique: true },
  tamimahVerificationCode: { type: String }, // إضافة رمز التحقق من شركة تميمة
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String },
  role: { type: String, default: 'user', enum: ['user', 'admin'] }, //
});

export default mongoose.models.User || mongoose.model<Users>("User", UserSchema);
