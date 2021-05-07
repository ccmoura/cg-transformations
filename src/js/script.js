const { gl, meshProgramInfo } = initializeWorld();

const transformations = [];

function main(shapeBufferInfo, shapeUniforms, index) {
  const VAO = twgl.createVAOFromBufferInfo(
    gl,
    meshProgramInfo,
    shapeBufferInfo,
  );

  var fieldOfViewRadians = degToRad(60);

  function computeMatrix(
    viewProjectionMatrix, 
    xRotation, 
    yRotation,
     zRotation,
     xTranslation,
     yTranslation,
     zTranslation,
     xScale,
     yScale,
     zScale,
     p1Rotation,
     p2Rotation,
     p3Rotation,
     angle
     ) {

    let scaled = m4.scale(viewProjectionMatrix, xScale, yScale, zScale);

    var matrix = m4.translate(
      scaled,
      xTranslation,
      yTranslation,
      zTranslation,
    );

    matrix = m4.xRotate(matrix, xRotation);
    matrix = m4.yRotate(matrix, yRotation);
    matrix = m4.zRotate(matrix, zRotation);
    matrix = p3Rotation === 0 && p2Rotation === 0 && p1Rotation === 0 ? matrix : m4.axisRotate(matrix, [p1Rotation, p2Rotation, p3Rotation], angle, matrix);

    return matrix
  }

  loadGUI(index, m4);

  function render() {
    twgl.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, 1, 2000);

    // Compute the camera's matrix using look at.
    var cameraPosition = [xCamera['X'], yCamera['Y'], (100 - zoom['Zoom']) * 10];
    var target = [followShape['Follow Shape'] ? transformations[index].xTranslation['X'] : yCameraRotation['Y'], followShape['Follow Shape'] ? transformations[index].yTranslation['Y'] : xCameraRotation['X'], 0];
    var up = [zCameraRotation['Z'], 1, 0];
    var cameraMatrix = m4.lookAt(cameraPosition, target, up);

    // Make a view matrix from the camera matrix.
    var viewMatrix = m4.inverse(cameraMatrix);

    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

    gl.useProgram(meshProgramInfo.program);

    // ------ Draw the shape --------
    gl.bindVertexArray(VAO);

    shapeUniforms.u_matrix = computeMatrix(
      viewProjectionMatrix,
      transformations[index].xRotation['X'],
      transformations[index].yRotation['Y'],
      transformations[index].zRotation['Z'],
      transformations[index].xTranslation['X'],
      transformations[index].yTranslation['Y'],
      transformations[index].zTranslation['Z'],
      transformations[index].xScale['X'],
      transformations[index].yScale['Y'],
      transformations[index].zScale['Z'],
      transformations[index].p1Rotation['X'],
      transformations[index].p2Rotation['Y'],
      transformations[index].p3Rotation['Z'],
      transformations[index].angle['angle']
    );

    // Set the uniforms we just computed
    twgl.setUniforms(meshProgramInfo, shapeUniforms);

    twgl.drawBufferInfo(gl, shapeBufferInfo);
  	requestAnimationFrame(render);
  }
     
  requestAnimationFrame(render);
}

const gui = new dat.GUI();

loadCameraGui()
var obj = { 'Add shape': () => {
  transformations.push({
    xRotation: { 'X': degToRad(1) },
    yRotation: { 'Y': degToRad(1) },
    zRotation: { 'Z': degToRad(1) },
    xTranslation: { 'X': degToRad(1) },
    yTranslation: { 'Y': degToRad(1) },
    zTranslation: { 'Z': degToRad(1) },
    xScale: { 'X': 1 },
    yScale: { 'Y': 1 },
    zScale: { 'Z': 1 },
    p1Rotation: { 'X': 0 },
    p2Rotation: { 'Y': 0 },
    p3Rotation: { 'Z': 0 },
    angle: { 'angle': degToRad(0) }
  });

  main(
    generateShape(gl, m4), 
    {
      u_colorMult: [Math.random(), Math.random(), Math.random(), 1],
      u_matrix: m4.identity(),
    },
    transformations.length - 1
  )
  }
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function shuffleArray(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

async function generateSmoothedAnimation(actual, target, index, t){
  let x, y;
  if(actual < target) {
    x = Math.floor(actual);
    y = Math.floor(target);
  } else {
    x = Math.floor(target);
    y = Math.floor(actual);
  }

  while(x != y){
    await sleep(10)
    Object.assign(transformations[index], { 
      [t]: {
        [Object.keys(transformations[index][t])[0]]: x }
      }
    )
    x += 0.01
  }
}

var animateOne = { 'Animate One': async () => {
    if(transformations.length === 0) 
      return;
    
    const maxValue = 15;
    const index = Math.floor(Math.random() * transformations.length);

    for (const t of Object.keys(shuffleArray(transformations)[index])) {
      await sleep(300)
      const value = transformations[index][t][`${Object.keys(transformations[index][t])[0]}`];
      generateSmoothedAnimation(value, Math.floor(Math.random() * (value + maxValue)) * (Math.round(Math.random()) == 0 ? 1 : -1), index, t);
    }

    
  }
}

gui.add(obj, 'Add shape');
gui.add(animateOne, 'Animate One');
