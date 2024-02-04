// dateUtils.js
export const getInitialDateValues = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1

  let initialStartYear, initialStartMonth, initialEndYear, initialEndMonth;

  if (currentDate.getDate() !== 1) {
    // Not the first day of the month
    initialStartYear = currentYear;
    initialStartMonth = currentMonth;
    initialEndYear = currentYear;
    initialEndMonth = currentMonth;
  } else if (currentMonth !== 1) {
    // First day of the month, but not January
    initialStartYear = currentYear;
    initialStartMonth = currentMonth - 1;
    initialEndYear = currentYear;
    initialEndMonth = currentMonth - 1;
  } else {
    // First day of January
    initialStartYear = currentYear - 1;
    initialStartMonth = 12;
    initialEndYear = currentYear - 1;
    initialEndMonth = 12;
  }

  return {
    initialStartYear,
    initialStartMonth,
    initialEndYear,
    initialEndMonth,
  };
};
