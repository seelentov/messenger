export function formatToDDMMYYYY(value) {
  const cleanedValue = value.replace(/\D/g, '');
  const formattedValue = cleanedValue.replace(/(\d{2})(\d{2})(\d{4})/, '$1.$2.$3');
  const currentDate = new Date();
  const dateParts = formattedValue.split('.');
  const inputDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

  if (inputDate > currentDate) {
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    return `${currentDay}.${currentMonth}.${currentYear}`;
  }

  return formattedValue.slice(0, 10);
}