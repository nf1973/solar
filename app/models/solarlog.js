import mongoose from "mongoose";

const solarLogSchema = new mongoose.Schema({
  date: String,
  year: Number,
  month: Number,
  day: Number,
  energyGenerated: Number,
  efficiency: String,
  peakPower: Number,
  peakTime: String,
  weatherCondition: String,
});

const SolarLogModel =
  mongoose.models.SolarLog ||
  mongoose.model("SolarLog", solarLogSchema, "solarlogs");

export default SolarLogModel;
