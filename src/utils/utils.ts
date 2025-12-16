export const formatDate = (date: number | Date) => {
  // Se date for um objeto Date, converta para timestamp
  const d = date instanceof Date ? date : new Date(date * 1000);

  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");

  return `${hours} : ${minutes}`;
};
