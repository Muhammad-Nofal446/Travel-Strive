import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  hasPaid: {
    type: Boolean,
    required: true,
  },
  planSelected: {
    type: Number,
    required: true,
  },
});
export default mongoose.model("payments", paymentSchema)