import React, { useState } from "react";

const DateRangePicker = ({
  startYear,
  setStartYear,
  startMonth,
  setStartMonth,
  endYear,
  setEndYear,
  endMonth,
  setEndMonth,
}) => {
  const handleDateChange = () => {
    onDateChange(startYear, startMonth, endYear, endMonth);
  };

  const handlePreselection = (range) => {
    const currentDate = new Date();
    let newStartYear = startYear;
    let newStartMonth = startMonth;
    let newEndYear = endYear;
    let newEndMonth = endMonth;

    switch (range) {
      case "lastYear":
        newStartYear = currentDate.getFullYear() - 1;
        newStartMonth = 1; // January
        newEndYear = currentDate.getFullYear() - 1;
        newEndMonth = 12; // December
        break;
      case "thisYear":
        newStartYear = currentDate.getFullYear();
        newStartMonth = 1; // January
        newEndYear = currentDate.getFullYear();
        newEndMonth = 12; // December
        break;
      case "lastMonth":
        newStartYear =
          currentDate.getMonth() === 0
            ? currentDate.getFullYear() - 1
            : currentDate.getFullYear();
        newStartMonth =
          currentDate.getMonth() === 0 ? 12 : currentDate.getMonth();
        newEndYear = currentDate.getFullYear();
        newEndMonth = currentDate.getMonth();
        break;
      case "thisMonth":
        newStartYear = currentDate.getFullYear();
        newStartMonth = currentDate.getMonth() + 1;
        newEndYear = currentDate.getFullYear();
        newEndMonth = currentDate.getMonth() + 1;
        break;
      case "yearToDate":
        newStartYear = currentDate.getFullYear();
        newStartMonth = 1; // January
        newEndYear = currentDate.getFullYear();
        newEndMonth = currentDate.getMonth() + 1;
        break;
      default:
        break;
    }

    setStartYear(newStartYear);
    setStartMonth(newStartMonth);
    setEndYear(newEndYear);
    setEndMonth(newEndMonth);
  };

  return (
    <div className="flex gap-8 ">
      <div className="flex flex-col items-center  mr-4">
        <div className="space-x-4 mb-4">
          <div className="flex flex-col">
            <label htmlFor="startYear">Start</label>
            <div className="flex items-center">
              <select
                id="startMonth"
                value={startMonth}
                onChange={(e) => setStartMonth(parseInt(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 mr-2"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(2000, i, 1).toLocaleString("en-US", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
              <input
                type="number"
                id="startYear"
                value={startYear}
                onChange={(e) => setStartYear(parseInt(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 w-20"
              />
            </div>
          </div>
        </div>
        <div className="space-x-4 mb-4">
          <div className="flex flex-col">
            <label htmlFor="endYear">End</label>
            <div className="flex items-center">
              <select
                id="endMonth"
                value={endMonth}
                onChange={(e) => setEndMonth(parseInt(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 mr-2"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(2000, i, 1).toLocaleString("en-US", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
              <input
                type="number"
                id="endYear"
                value={endYear}
                onChange={(e) => setEndYear(parseInt(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 w-20"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-6 mr-4">
        <button
          onClick={() => handlePreselection("thisMonth")}
          className="border border-gray-300 rounded px-4 py-1 mb-2 w-32"
          aria-label="This Month"
        >
          This Month
        </button>
        <button
          onClick={() => handlePreselection("lastMonth")}
          className="border border-gray-300 rounded px-4 py-1 mb-2 w-32"
          aria-label="Last Month"
        >
          Last Month
        </button>
        <button
          onClick={() => handlePreselection("thisYear")}
          className="border border-gray-300 rounded px-4 py-1 mb-2 w-32"
          aria-label="This Year"
        >
          This Year
        </button>
        <button
          onClick={() => handlePreselection("lastYear")}
          className="border border-gray-300 rounded px-4 py-1 mb-2 w-32"
          aria-label="Last Year"
        >
          Last Year
        </button>
      </div>
      {/* <div className="flex flex-col justify-start items-center mt-6">
        <button
          onClick={handleDateChange}
          className="border border-gray-300 rounded px-12 py-2 mb-2 bg-blue-500 text-white hover:bg-blue-600"
          aria-label="Apply"
        >
          Apply
        </button>
      </div> */}
    </div>
  );
};

export default DateRangePicker;
