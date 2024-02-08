"use server";
import { connectToMongoDB } from "../lib/mongoose";
import SolarLogModel from "./models/solarlog";

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

// export const getSolarLogs = async (
//   startYear,
//   startMonth,
//   endYear,
//   endMonth
// ) => {
//   try {
//     const db = await connectToMongoDB();
//     const SolarLogsModel = db.model("SolarLog");

//     const queryConditions = {
//       date: {
//         $gte: `${startYear}${startMonth.toString().padStart(2, "0")}01`,
//         $lte: `${endYear}${endMonth.toString().padStart(2, "0")}31`,
//       },
//     };

//     const solarLogs = await SolarLogsModel.find(queryConditions);
//     return JSON.parse(JSON.stringify(solarLogs));
//   } catch (err) {
//     throw err;
//   }
// };

// export const getMonthlySummary = async (
//   startYear,
//   startMonth,
//   endYear,
//   endMonth
// ) => {
//   try {
//     const db = await connectToMongoDB();
//     const SolarLogsModel = db.model("SolarLog");

//     const queryConditions = {
//       date: {
//         $gte: `${startYear}${startMonth.toString().padStart(2, "0")}01`,
//         $lte: `${endYear}${endMonth.toString().padStart(2, "0")}31`,
//       },
//     };

//     const monthlySummary = await SolarLogsModel.aggregate([
//       { $match: queryConditions },
//       {
//         $group: {
//           _id: { year: "$year", month: "$month" },
//           totalEnergy: { $sum: "$energyGenerated" },
//           averageDailyEnergy: { $avg: "$energyGenerated" },
//           averageEfficiency: { $avg: { $toDouble: "$efficiency" } },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           totalEnergy: 1,
//           averageDailyEnergy: 1,
//           averageEfficiency: 1,
//           date: {
//             $concat: [
//               { $toString: "$_id.year" },
//               {
//                 $cond: { if: { $lte: ["$_id.month", 9] }, then: "0", else: "" },
//               },
//               { $toString: "$_id.month" },
//             ],
//           },
//         },
//       },
//       { $sort: { date: 1 } },
//     ]);

//     return monthlySummary;
//   } catch (err) {
//     throw err;
//   }
// };

// export const getYearlySummary = async (startYear, endYear) => {
//   try {
//     const db = await connectToMongoDB();
//     const SolarLogsModel = db.model("SolarLog");

//     const queryConditions = {
//       date: {
//         $gte: `${startYear}0101`,
//         $lte: `${endYear}1231`,
//       },
//     };
//     const yearlySummary = await SolarLogsModel.aggregate([
//       { $match: queryConditions },
//       {
//         $group: {
//           _id: { year: "$year" },
//           totalEnergy: { $sum: "$energyGenerated" },
//           averageDailyEnergy: { $avg: "$energyGenerated" },
//           averageEfficiency: { $avg: { $toDouble: "$efficiency" } },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           totalEnergy: 1,
//           averageDailyEnergy: 1,
//           averageEfficiency: 1,
//           date: { $toString: "$_id.year" },
//         },
//       },
//       { $sort: { date: 1 } },
//     ]);

//     return yearlySummary;
//   } catch (err) {
//     throw err;
//   }
// };
