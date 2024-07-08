export default function changeTimeFrom24to12({
  time,
  year,
  month,
  day,
  hour,
  minute,
  hour12,
}) {
  let date = new Date(time);
  return isNaN(date.getTime()) ? ' ' : date.toLocaleString("en-US", {
    year: year ? "numeric" : undefined,
    month: month ? "short" : undefined,
    day: day ? "numeric" : undefined,
    hour: hour ? "numeric" : undefined,
    minute: minute ? "numeric" : undefined,
    hour12: hour12 || true,
  }) || ' ';
}
