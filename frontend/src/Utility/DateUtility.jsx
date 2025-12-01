const formatDate=(dateString)=> {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
}

const formatDateWithTime=(dateString)=> {
  if (!dateString) return undefined;

  const date = new Date(dateString);

  return date.toLocaleString("en-US", {
    weekday: "long",   // e.g. Sunday
    year: "numeric",
    month: "short",    // e.g. Oct
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true       // Enables AM/PM
  });
}

const extractTimeIn12HourFormat=(dateString)=>{
  if (!dateString) return undefined;
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
}

export {formatDate,formatDateWithTime,extractTimeIn12HourFormat}