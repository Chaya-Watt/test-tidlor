export const formatCitizenId = value => {
  const formatValue = value.replace(
    /(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/g,
    '$1-$2-$3-$4-$5',
  );

  return formatValue;
};

export const formatPhone = value => {
  const formatValue = value.replace(/(\d{3})(\d{7})/g, '$1-$2');

  return formatValue;
};
