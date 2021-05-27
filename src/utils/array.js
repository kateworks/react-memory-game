
function shuffle(initArray) {
  const array = initArray.slice();

  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export function createShuffledArray(arraySize = 18) {
  const array = [];
  for (let i = 1; i <= arraySize; i++) {
    array.push(i);
    array.push(i);
  }
  return shuffle(array);
}


