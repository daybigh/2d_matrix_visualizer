var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
const u = 45; //base unit for grid
let t = 20; //idr what this is, maybe grid frequency?

ctx.globalCompositeOperation = "destination-out";

canvas.width = 20 * u;
canvas.height = 18 * u;

ctx.translate(canvas.width / 2, canvas.height / 2); //move origin to center of screen

//does non-generalized hard coded 2x2 multiplication, used in displayTransformedGrid() I think
function matrixMult(matrix, vector) {
  return [
    vector[0] * matrix[0][0] + vector[1] * matrix[0][1],
    vector[0] * matrix[1][0] + vector[1] * matrix[1][1],
  ];
}

//draws span of vector, going to be used together with getEigenVector() to display eigenspace I think?
function displaySpan(v) {
  ctx.beginPath();
  ctx.lineTo(0, 0);
  ctx.lineTo(1000 * v[0], 1000 * v[1]);
  ctx.strokeStyle = "rgb(32, 246, 0)";
  ctx.stroke();

  ctx.beginPath();
  ctx.lineTo(0, 0);
  ctx.lineTo(-1000 * v[0], -1000 * v[1]);
  ctx.strokeStyle = "rgb(32, 246, 0)";
  ctx.stroke();
}

//makes grid real
function displayBaseGrid() {
  //base vertical
  for (var i = -t; i <= t; i++) {
    ctx.beginPath();
    for (var j = -t; j <= t; j++) {
      let vec = [i, j];
      let vec2 = [i, j + 1];
      ctx.lineTo(u * vec[0], -u * vec[1]);
    }
    if (i == 0) {
      ctx.strokeStyle = "rgb(255, 255, 255)";
    } else {
      ctx.strokeStyle = "grey";
    }
    ctx.stroke();
  }

  //base horizontal
  for (var i = -t; i <= t; i++) {
    ctx.beginPath();
    for (var j = -t; j <= t; j++) {
      let vec = [j, i];
      let vec2 = [j + 1, i];
      ctx.lineTo(u * vec[0], -u * vec[1]);
    }
    if (i == 0) {
      ctx.strokeStyle = "rgb(255, 255, 255)";
    } else {
      ctx.strokeStyle = "grey";
    }
    ctx.stroke();
  }
}

//WIP
function getEigenValue(m) {
  a = m[0][0];
  b = m[0][1];
  c = m[1][0];
  d = m[1][1];

  if ((a + d) ** 2 - 4 * (a * d - b * c) < 0) {
    return null;
  } else {
    temp1 = (a + d + Math.sqrt((a + d) ** 2 - 4 * (a * d - b * c))) / 2;
    temp2 = (a + d - Math.sqrt((a + d) ** 2 - 4 * (a * d - b * c))) / 2;
    return [temp1, temp2];
  }
}

//WIP
function getEigenVector(m) {
  if (getEigenValue(m) == null) {
    return null;
  } else {
    eValue = getEigenValue(m);
    temp1 = [
      [m[0][0] - eValue[0], m[0][1]],
      [m[1][0], m[1][1] - eValue[0]],
    ];
    temp2 = [
      [m[0][0] - eValue[1], m[0][1]],
      [m[1][0], m[1][1] - eValue[1]],
    ];

    ans1 = gauss(temp1, [0, 0]);
    ans2 = gauss(temp2, [0, 0]);

    return [ans1, ans2];
  }
}

//displays Transformed grid
function displayTransformedGrid(m) {
  for (var i = -t; i <= t; i++) {
    ctx.beginPath();
    for (var j = -t; j <= t; j++) {
      let vec = matrixMult(m, [i, j]);
      ctx.lineTo(u * vec[0], -u * vec[1]);
    }
    ctx.strokeStyle = "red";
    ctx.stroke();
  }

  for (var i = -t; i <= t; i++) {
    ctx.beginPath();
    for (var j = -t; j <= t; j++) {
      let vec = matrixMult(m, [j, i]);
      ctx.lineTo(u * vec[0], -u * vec[1]);
    }
    ctx.strokeStyle = "red";
    ctx.stroke();
  }
}

//clears everything on screen
function clearGrid() {
  ctx.clearRect(
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );
}

//displays deterrmiant of b
function displayDeterminant(b) {
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.lineTo(0, 0);
  ctx.lineTo(u * b[0][0], -u * b[1][0]);
  ctx.strokeStyle = "darkgray";
  ctx.stroke();

  ctx.beginPath();
  ctx.lineTo(0, 0);
  ctx.lineTo(u * b[0][1], -u * b[1][1]);
  ctx.strokeStyle = "darkgray";
  ctx.stroke();
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.lineTo(0, 0);
  ctx.lineTo(u * b[0][0], -u * b[1][0]);
  ctx.lineTo(u * b[0][0] + u * b[0][1], -u * b[1][0] - u * b[1][1]);
  ctx.lineTo(u * b[0][1], -u * b[1][1]);
  ctx.closePath();
  ctx.fillStyle = "rgb(32, 246, 0)";
  ctx.fill();
}

//main guy that gets called and does everything
function main() {
  clearGrid(); //each time button is clicked, clear the entire grid
  displayBaseGrid(); //then draw the base grid

  let b = [
    [
      document.getElementById("m00").value,
      document.getElementById("m01").value,
    ],
    [
      document.getElementById("m10").value,
      document.getElementById("m11").value,
    ],
  ]; //Get the inputted 2x2 matrix

  displayTransformedGrid(b); //display transformed grid ontop of base grid
  displayDeterminant(b); //display the determiant
}

//at the start of website, have just a base grid
displayBaseGrid();
