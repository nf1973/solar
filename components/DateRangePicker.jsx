import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
      case "thisYear":
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

  const handleStartChange = (e) => {
    const [year, month] = e.target.value
      .split("-")
      .map((value) => parseInt(value));
    if (!isNaN(year) && !isNaN(month) && year && month) {
      setStartYear(year);
      setStartMonth(month);
    }
  };

  const handleEndChange = (e) => {
    const [year, month] = e.target.value
      .split("-")
      .map((value) => parseInt(value));
    if (!isNaN(year) && !isNaN(month) && year && month) {
      setEndYear(year);
      setEndMonth(month);
    }
  };
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const minDate = "2018-01";
  const maxDate = `${currentYear}-${currentMonth.toString().padStart(2, "0")}`;

  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle>Select Date Range</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between ">
            <div>
              <div className="flex flex-col">
                <label htmlFor="startYear">From</label>
                <div className="flex items-center">
                  <input
                    type="month"
                    id="startYear"
                    min={minDate}
                    max={maxDate}
                    value={`${startYear}-${startMonth
                      .toString()
                      .padStart(2, "0")}`}
                    onChange={handleStartChange}
                    className="border border-gray-300 rounded px-2"
                  />
                </div>
              </div>
            </div>
            <div className="space-x-4 mb-4">
              <div className="flex flex-col">
                <label htmlFor="endYear">To</label>
                <div className="flex items-center">
                  <input
                    type="month"
                    id="endYear"
                    min={minDate}
                    max={maxDate}
                    value={`${endYear}-${endMonth.toString().padStart(2, "0")}`}
                    onChange={handleEndChange}
                    className="border border-gray-300 rounded px-2"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 items-center justify-center">
            <Button
              variant="secondary"
              onClick={() => handlePreselection("thisMonth")}
              aria-label="This Month"
            >
              This Month
            </Button>
            <Button
              variant="secondary"
              onClick={() => handlePreselection("lastMonth")}
              aria-label="Last Month"
            >
              Last Month
            </Button>
            <Button
              variant="secondary"
              onClick={() => handlePreselection("thisYear")}
              aria-label="This Year"
            >
              This Year
            </Button>
            <Button
              variant="secondary"
              onClick={() => handlePreselection("lastYear")}
              aria-label="Last Year"
            >
              Last Year
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DateRangePicker;
