export function formatToDDMMYYYY(value) {
  const cleanedValue = value.replace(/\D/g, '');
  const formattedValue = cleanedValue.replace(/(\d{2})(\d{2})(\d{4})/, '$1.$2.$3');
  console.log(formattedValue.slice(0,10))
  return formattedValue.slice(0,10)
}