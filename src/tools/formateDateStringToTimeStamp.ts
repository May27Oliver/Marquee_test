import moment, { Moment } from "moment-timezone";

const STRING_FORMAT = "YYYYMMDD_HH:mm:ss.SSS";
const TIMEZONE = "Asia/Taipei";
type ReturnType = "Date" | "TimeStamp" | "Moment";

function formateDateStringToMoment(value: string) {
  return moment.tz(value, STRING_FORMAT, TIMEZONE);
}

function formateDateStringToTimeStamp(value: string): number;
function formateDateStringToTimeStamp(value: string, type: "Date"): Date;
function formateDateStringToTimeStamp(value: string, type: "TimeStamp"): number;
function formateDateStringToTimeStamp(value: string, type: "Moment"): Moment;
function formateDateStringToTimeStamp(
  value: string,
  type: ReturnType = "TimeStamp"
): Date | Number | Moment {
  const valueInMoment = formateDateStringToMoment(value);

  switch (type) {
    case "Date":
      return valueInMoment.toDate();
    case "TimeStamp":
      return valueInMoment.valueOf();
    case "Moment":
      return valueInMoment;
    default:
      throw Error("Error type");
  }
}

export { formateDateStringToTimeStamp };
