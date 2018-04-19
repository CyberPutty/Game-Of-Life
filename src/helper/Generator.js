export function arrayDeepCopy(arr) {
  let newArray = arr.slice();
  for (let i = 0; i < arr.length; i++) {
    newArray[i] = arr[i].slice();
  }
  return newArray;
}
export function SetGrid(cols, rows) {
  let tempGrid = [];
  let dead = 'D';
  let alive = 'A';
  for (let i = 0; i < cols; i++) {
    tempGrid.push([]);
    for (let j = 0; j < rows; j++) {
      if (Random(2) % 2 === 0) {
        tempGrid[i].push('D');
      }
      else {
        tempGrid[i].push('A');
      }
    }
  }
  return tempGrid;
}
export function Random(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
// current generation is newGrid[[d,a,d,d,a,a,d,d,a],[d,a,d,d,a,a,d,d,a],[d,a,d,d,a,a,d,d,a],[d,a,d,d,a,a,d,d,a],[d,a,d,d,a,a,d,d,a],[d,a,d,d,a,a,d,d,a],[d,a,d,d,a,a,d,d,a]]
export function isAlive(currentGeneration) {
  let row = 0;
  let col = 0;
  // slice current generation
  let nextGeneration = arrayDeepCopy(currentGeneration);
  // console.log(nextGeneration)
  // console.log(currentGeneration)

  while (row < currentGeneration.length && col < currentGeneration[0].length) {

    let count = 0;
    // start with no counts for Alive unless the starting cell is Alive then -1 because only counting neighbors
    if (currentGeneration[row][col] === "A") {
      count = -1;
      //  console.log(count)
    }
    // loop start and -1,-1 and end +1,+1 to cover 9 cells. edges will be undefined. Throwing TypeError currentGeneration[i] undefined.
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        //typeof response[0] !== 'undefined'
        if (typeof currentGeneration[i] === 'undefined' ||
          typeof currentGeneration[i][j] === 'undefined') {
          //console.log("cell"+[i]+[j]+" contents undefined"+" currentCell"+[row]+[col]+" out of bounds");// off the grid
        }
        else if (typeof currentGeneration[i] !== 'undefined' &&
          typeof currentGeneration[i][j] !== 'undefined' && currentGeneration[i][j] === 'A') {
          //console.log("cell"+[i]+[j]+" contents " +currentGeneration[i][j]+" currentCell"+[row]+[col]+" alive");// alive
          count++;
        }
        else if (typeof currentGeneration[i] !== 'undefined' &&
          typeof currentGeneration[i][j] !== 'undefined' && currentGeneration[i][j] === 'D') {
          //console.log("cell"+[i]+[j]+" contents " +currentGeneration[i][j]+" currentCell"+[row]+[col]+" dead");// dead
        }
      }
    }
    // birth on 3, no change on 2, death on <2 or 3>
    //console.log(count);
    if (count > 3) {
      nextGeneration[row][col] = "D";
    }
    else if (count < 2) {
      nextGeneration[row][col] = "D";
    }
    else if (count == 3) {
      nextGeneration[row][col] = "A"
    }
    // loop through each cell
    if (col <= currentGeneration[row].length) {
      col++;
    }
    if (col == currentGeneration[row].length) {
      col = 0;
      row++;
    }
  }
  return nextGeneration;
}