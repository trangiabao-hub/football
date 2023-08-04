import * as moment from 'moment-timezone';
import 'moment/locale/vi';
function convertDateString(input: string): string {
  // Check if the input is in the valid format "yyyyMMdd"
  const regex = /^\d{8}$/;
  if (!regex.test(input)) {
    throw new Error("Invalid date format. Expected 'yyyyMMdd'");
  }

  // Extract year, month, and day from the input string
  const year = input.slice(0, 4);
  const month = input.slice(4, 6);
  const day = input.slice(6, 8);

  // Create a new Date object using the extracted values
  const date = new Date(Number(year), Number(month) - 1, Number(day));

  // Format the date to "dd/MM/yyyy"
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${
    (date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

  return formattedDate;
}

function getLocalDateTimeByFormat(serverTimestamp: any, format: string) {
  const date = new Date(serverTimestamp);

  // Helper function to pad zeros
  const padZero = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  // Extract date and time components
  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1); // Months are zero-based
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());
  const meridian = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // Convert to 12-hour format

  // Replace format placeholders with respective values
  format = format.replace("dd", day);
  format = format.replace("MM", month);
  format = format.replace("yyyy", year.toString());
  format = format.replace("hh", padZero(hours));
  format = format.replace("HH", hours.toString()); // If you want to keep the 24-hour format as well
  format = format.replace("mm", minutes);
  format = format.replace("ss", seconds);
  format = format.replace("vv", meridian);

  return format;
}

function convertToVietnamTime(timestamp: number, format: string): string {
  const utcMoment = moment.unix(timestamp).utc();
  const vietnamMoment = moment.tz(utcMoment, 'Asia/Ho_Chi_Minh');
  return vietnamMoment.format(format);
}

function getCurrentTimestamp() {
  return Math.floor(Date.now() / 1000); // Convert milliseconds to seconds
}

export {convertDateString,getLocalDateTimeByFormat, convertToVietnamTime, getCurrentTimestamp}
