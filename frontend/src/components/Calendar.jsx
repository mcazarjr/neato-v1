import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

const Calendar = ({ year, month }) => {
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  // Check if year and month are valid otherwise use current year and month
  if (!dayjs().set("year", year).isValid()) {
    year = dayjs().year();
  }
  if (
    !dayjs()
      .set("month", month - 1)
      .isValid()
  ) {
    month = dayjs().month() + 1;
  }

  // Get the first day of the month
  const today = dayjs()
    .set("year", year)
    .set("month", month - 1);

  // Get all the days in the month
  const days = Array.from({ length: today.daysInMonth() }, (_, i) =>
    today.set("date", i + 1)
  );

  // Add days from the previous month to the first week
  const firstDay = days[0].day();
  if (firstDay > 0) {
    const previousMonth = today.subtract(1, "month");
    const previousDays = Array.from({ length: firstDay }, (_, i) =>
      previousMonth.set("date", previousMonth.daysInMonth() - firstDay + i + 1)
    );
    days.unshift(...previousDays);
  }

  // Add days from the next month to the last week
  const lastDay = days[days.length - 1].day();
  if (lastDay < 6) {
    const nextMonth = today.add(1, "month");
    const nextDays = Array.from({ length: 6 - lastDay }, (_, i) =>
      nextMonth.set("date", i + 1)
    );
    days.push(...nextDays);
  }

  // Chunk the days array into sub-arrays of 7 days each
  const weeks = [];
  let currentWeek = [];

  days.forEach((day, index) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || index === days.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  return (
    <>
      <table className="calendar">
        <caption className="font-bold text-2xl text-center p-2 text-[#263C44]">
          {today.format("MMMM")}
        </caption>
        <thead>
          <tr className="">
            {weekDays.map((day, index) => (
              <th className="text-center p-2" key={`day_${index}`}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={`week_${weekIndex}`}>
              {week.map((day, dayIndex) => (
                <td
                  className={`text-center px-4 py-3 ${
                    day.month() === today.month()
                      ? day.isSame(dayjs(), "date")
                        ? "text-white bg-primary rounded-lg"
                        : "text-[#263C44]"
                      : day.isBefore(today, "month")
                      ? "text-[#797979]"
                      : "text-[#797979]"
                  }`}
                  key={`day_${dayIndex}`}
                >
                  {day.format("D")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Calendar;
