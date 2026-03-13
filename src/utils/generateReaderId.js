export const generateReaderId = () => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000);
  return `reader-${timestamp}-${randomNum}`;
};
