const dateString = "2024-01-08T18:40:00.000Z";

// Create a Date object from the input string
const date = new Date(dateString);

// Define options for formatting the date
const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZoneName: "short",
};

// Format the date using Intl.DateTimeFormat
const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

console.log(formattedDate);
