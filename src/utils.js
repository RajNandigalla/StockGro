export const deepCopy = (data) => {
  if (!data) return null;
  return JSON.parse(JSON.stringify(data));
};
