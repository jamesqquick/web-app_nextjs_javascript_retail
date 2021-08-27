export const getRandomPointsValue = () => {
  const max = 200;
  const min = 1;

  let randInt = Math.floor(Math.random() * (max - min + 1) + min);

  while (randInt === 0) {
    randInt = Math.floor(Math.random() * (max - min + 1) + min);
  }

  return randInt;
};
