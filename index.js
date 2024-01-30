const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  // Generate calendar data for the year 2024
  const calendarData = generateCalendarData(2024);

  res.render('calendar', { calendarData });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

function generateCalendarData(year) {
  const calendarData = [];

  for (let month = 1; month <= 12; month++) {
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfWeek = new Date(year, month - 1, 1).getDay(); // 0 is Sunday, 1 is Monday, etc.

    const monthData = {
      month: getMonthName(month),
      days: [],
    };

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      monthData.days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      monthData.days.push({ day });
    }

    calendarData.push(monthData);
  }

  return calendarData;
}

function getMonthName(month) {
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  return months[month - 1];
}
