import moment from "moment";

export const calculateDaysOfStay = (checkInDate: Date, checkoutDate: Date) => {
  const startDate = moment(checkInDate);
  const endDate = moment(checkoutDate);
  //   "days" to get differnce between 2 dates
  return endDate.diff(startDate, "days") + 1;
};


export const addCommasInAmount = (amount:number) => amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// Using this regular expression It can add commas whrever needed.