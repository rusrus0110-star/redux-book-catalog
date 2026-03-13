export const generateBookId = () => {
  // Date.now() return the number of milliseconds since January 1, 1970, 00:00:00 UTC
  const timestamp = Date.now();

  const randomNum = Math.floor(Math.random() * 1000);

  // combinate timestamp and random number for uniqueness
  return `${timestamp}-${randomNum}`;
};
