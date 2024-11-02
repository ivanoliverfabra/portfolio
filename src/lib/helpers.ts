import { isSameDay, isSameMonth } from "date-fns";

export const isBirthday = () => {
  const today = new Date();
  const birthDate = new Date("2005-05-19");
  return isSameMonth(birthDate, today) && isSameDay(birthDate, today);
};

export const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 25%, 50%)`;
};
