import express from "express";
import {
  addTaxiBooking,
  deleteTaxiBooking,
  getTaxiBooking,
  getTaxiBookingWithUser,
  updateTaxiBooking,
} from "../controllers/taxiBookingController.js";

const router = express.Router();

router.post("/addtaxi-booking", addTaxiBooking);
router.get("/gettaxi-booking", getTaxiBooking);
router.get("/gettaxi-bookings", getTaxiBookingWithUser);
router.delete("/deletetaxi-booking/:id", deleteTaxiBooking);
router.put("/updatetaxi-booking", updateTaxiBooking);

export default router;
