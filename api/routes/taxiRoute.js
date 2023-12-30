import express from "express";
import {
  addTaxi,
  getTaxi,
  getSTaxiDetail,
  deleteTaxi,
  updateTaxi,
} from "../controllers/taxiController.js";

const router = express.Router();

router.post("/addtaxi", addTaxi);
router.get("/gettaxi", getTaxi);
router.delete("/deletetaxi/:id", deleteTaxi);
router.put("/updatetaxi", updateTaxi);
router.get("/taxi-booking/:id", getSTaxiDetail);

export default router;
