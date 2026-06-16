export const stringToHoursAndMinutes = (timeString: string) => {
  const [hour, minutes] = timeString.split(":");

  return [Number(hour), Number(minutes)];
};
