const fs = require("node:fs");
let mazeStr;

fs.readFile("./maze.txt", "utf8", (err, str) => {
  if (err) {
    console.error(err);
    return;
  }
  const mazeStr = str;
  const result = getUniqueLocations(mazeStr);

  console.log(result);
});

function getUniqueLocations(mazeStr) {
  let spots = {};
  let currentLocation;
  let currentDirection = "↑";
  let rows = mazeStr.split("\r\n").reverse();
  const visitedLocations = [];
  for (const [indexY, row] of rows.entries()) {
    for (const [indexX, spot] of row.split("").entries()) {
      const tile = new Tile(indexX, indexY, spot);

      spots[String(indexX) + " " + String(indexY)] = tile;
      if (spot === "^") {
        currentLocation = String(indexX) + " " + String(indexY);
        visitedLocations.push(currentLocation);
      }
    }
  }

  function Tile(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
  }

  while (spots[currentLocation] !== undefined) {
    let vector = getVector(currentDirection);
    if (getNextSpot(vector) === undefined) {
      break;
    }
    if (getNextSpot(vector).value === "#") {
      currentDirection = rotate90(currentDirection);
      vector = getVector(currentDirection);
    }

    const nextSpot = getNextSpot(vector);
    currentLocation = String(nextSpot.x) + " " + String(nextSpot.y);
    if (!visitedLocations.includes(currentLocation)) {
      visitedLocations.push(currentLocation);
    }
  }

  return console.log(visitedLocations.length);

  function getVector(direction) {
    const Vector = {
      ["↑"]: { x: 0, y: 1 },
      ["↓"]: { x: 0, y: -1 },
      ["→"]: { x: 1, y: 0 },
      ["←"]: { x: -1, y: 0 },
    };

    return Vector[direction];
  }

  function getNextSpot(vector) {
    const splitLocation = currentLocation.split(" ");
    const x = Number(splitLocation[0]) + vector.x;
    const y = Number(splitLocation[1]) + vector.y;

    return spots[String(x) + " " + String(y)];
  }

  function rotate90(direction) {
    if (direction === "↑") {
      return "→";
    }
    if (direction === "→") {
      return "↓";
    }
    if (direction === "↓") {
      return "←";
    }
    if (direction === "←") {
      return "↑";
    }
  }
}
