import moment from "moment";

export const calculateDaysOfStay = (checkInDate: Date, checkoutDate: Date) => {
  const startDate = moment(checkInDate);
  const endDate = moment(checkoutDate);
//   "days" to get differnce between 2 dates
  return endDate.diff(startDate, "days") +1;
};
