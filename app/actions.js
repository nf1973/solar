"use server";
import { connectToMongoDB } from "../lib/mongoose";
import SolarLogModel from "./models/solarlog"; //Required!!

export const getAllSolarLogs = async () => {
  try {
    const db = await connectToMongoDB();
    const SolarLogsModel = db.model("SolarLog");

    const solarLogs = await SolarLogsModel.find({});
    return JSON.parse(JSON.stringify(solarLogs));
  } catch (err) {
    throw err;
  }
};

export const getAllSolarLogsSQL = async () => {
  try {
    const response = await fetch("https://mysolar-api.sn1316.com/getSolarLogs");
    if (!response.ok) {
      throw new Error("Failed to fetch solar logs");
    }
    const solarLogs = await response.json();
    return solarLogs;
  } catch (err) {
    throw err;
  }
};
