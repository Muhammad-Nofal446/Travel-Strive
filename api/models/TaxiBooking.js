import mongoose from "mongoose";
const TaxiBookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    taxiId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Taxi",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    taxiName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
    },
    bookedFrom: {
      type: Date,
      required: true,
    },
    bookedTill: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("TaxiBooking", TaxiBookingSchema);
