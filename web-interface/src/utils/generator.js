const PI = 3.14;
const height = 50;
const width = 150;
const methodList = [fullRandom, modulo, overDegree, dist, spiral, spiralEdge];

function rand(from, to) {
  return from + (to - from + 1) * Math.random();
}

function randInt(from, to) {
  return Math.floor(from + (to - from + 1) * Math.random());
}

function fullRandom({ deg }) {
  return Math.random() * deg;
}

function modulo({ i, j, deg }) {
  return Math.floor((j / width) * 10) * deg;
}

function overDegree({ i, j, deg }) {
  return ((i + j) / (height + width)) * deg;
}

function dist({ i, j, ioff, joff, deg }) {
  return ((Math.abs(ioff - i) + Math.abs(joff - j)) / (height + width)) * deg;
}

function spiral({ i, j, ioff, joff, deg }) {
  return (
    (Math.atan2(ioff - i, joff - j) * 180) / PI -
    (1 - (Math.abs(ioff - i) + Math.abs(joff - j)) / 100) * deg
  );
}

function spiralEdge({ i, j, ioff, joff }) {
  return (
    (Math.atan2(ioff - i, joff - j) * 180) / PI -
    (1 - (Math.abs(ioff - i) + Math.abs(joff - j)) / 100) * 360
  );
}

function getLine(i, j, fields, lineStepSize, lineLength) {
  let path = `M ${j} ${i} `;
  let x = j;
  let y = i;
  for (let index = 0; index < lineLength; index++) {
    const indexJ = Math.floor(x);
    const indexI = Math.floor(y);
    if (indexJ >= width || indexI >= height) break;

    const angle = fields[indexI][indexJ];
    const yOffset = Math.sin((angle / 180) * PI) * lineStepSize;
    const xOffset = Math.cos((angle / 180) * PI) * lineStepSize;
    x = Math.abs(x + xOffset);
    y = Math.abs(y + yOffset);
    path += `L ${x} ${y} `;
  }
  return `<path d="${path}" fill="none" style="stroke:white;stroke-width:0.1"/>`;
}

function render({
  lineLength,
  lineStepSize,
  startPointRandom,
  startLineSampling,
  yOffset,
  xOffset,
  deg,
  method,
}) {
  //======== SET UP =========//
  let fields = new Array(height).fill(0);
  for (let index = 0; index < height; index++) {
    fields[index] = new Array(width).fill(0);
  }

  //======== SET DIRECT =====//
  for (let i = 0; i < fields.length; i++) {
    // row
    for (let j = 0; j < fields[i].length; j++) {
      // colum

      fields[i][j] = methodList[method]({
        i,
        j,
        ioff: yOffset,
        joff: xOffset,
        deg,
      });
    }
  }

  //======== DRAW ======//
  let svg = `<svg xmlns='http://www.w3.org/2000/svg' height="${height}px" width="${width}px" viewBox="0 0 ${width} ${height}" style="background: black;">`;
  for (let i = 0; i < height; i += startLineSampling) {
    // row
    for (let j = 0; j < width; j += startLineSampling) {
      // colum
      if (Math.random() * 100 < startPointRandom * 100) {
        svg += getLine(i, j, fields, lineStepSize, lineLength);
      }
    }
  }
  svg += `</svg>`;
  return svg;
}

function _generate(method) {
  const parameter = {
    startLineSampling: 2,
    startPointRandom: 0.5,
    method, // 0 - 4
    lineStepSize: 1,
    lineLength: 75,
  };
  if (method === 5) {
    //spiral
    parameter.xOffset = Math.floor(width / 2 - 20 + 40 * Math.random());
    parameter.yOffset = Math.floor(height / 2 - 5 + 10 * Math.random());
    parameter.deg = 70 + 40 * Math.random();
    parameter.startLineSampling = randInt(2, 5);
  } else if (method === 4) {
    //spiral
    parameter.xOffset = Math.floor(width / 2 - 20 + 40 * Math.random());
    parameter.yOffset = Math.floor(height / 2 - 5 + 10 * Math.random());
    parameter.deg = 70 + 40 * Math.random();
    parameter.startLineSampling = randInt(2, 5);
  } else if (method === 1) {
    //modulo
    parameter.deg = rand(30, 70);
    parameter.startLineSampling = randInt(1, 2);
  } else if (method === 2) {
    //overDegree
    parameter.deg = Math.floor(2000 + 2000 * Math.random());
    parameter.startLineSampling = randInt(1, 5);
  } else if (method === 3) {
    //dist
    parameter.xOffset = Math.floor(width * Math.random());
    parameter.yOffset = Math.floor(height * Math.random());
    parameter.deg = Math.floor(180 + 40 * Math.random());
    parameter.startLineSampling = 2;
  } else {
    //fullRandom
    parameter.method = 0;
    parameter.deg = rand(160, 220);
    parameter.startLineSampling = Math.floor(rand(2, 5)); //2 - 5
  }

  return render(parameter);
}

export const generate = () => _generate(randInt(0, 5));
