import TaxiBooking from "../models/TaxiBooking.js";

export const addTaxiBooking = async (req, res, next) => {
  try {
    const newtaxiBooking = new TaxiBooking({
      userId: req.body.userId,
      taxiId: req.body.taxiId,
      name: req.body.name,
      taxiName: req.body.taxiName,
      city: req.body.city,
      bookedFrom: req.body.startDate,
      bookedTill: req.body.endDate,
      totalPrice: req.body.totalPrice,
    });
    await newtaxiBooking.save();
    res.status(200).json(newtaxiBooking);
  } catch (error) {
    console.log("Error in adding a Booking", error);
  }
};

export const getTaxiBooking = async (req, res) => {
  try {
    const taxiBookingList = await TaxiBooking.find();
    res.status(200).json(taxiBookingList);
  } catch (error) {
    console.log("Cannot get Taxi Booking List", error);
  }
};
export const getTaxiBookingWithUser = async (req, res) => {
  try {
    const taxiBookingList = await TaxiBooking.find().populate("userId").populate("taxiId");
    res.status(200).json(taxiBookingList);
  } catch (error) {
    console.log("Cannot get Taxi Booking List", error);
  }
};

export const updateTaxiBooking = async (req, res, next) => {
  try {
    const updatedTaxiBooking = await TaxiBooking.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTaxiBooking);
  } catch (err) {
    next(err);
  }
};
export const deleteTaxiBooking = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    if (!bookingId) {
      return res.status(400).json({ message: "Invalid booking ID." });
    }
    const deletedBooking = await TaxiBooking.findByIdAndDelete(bookingId);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.status(200).json("TaxiBooking has been deleted.");
  } catch (err) {
    next(err);
  }
};
