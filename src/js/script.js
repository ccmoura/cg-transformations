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
     zScale
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
    var target = [yCameraRotation['Y'], xCameraRotation['X'], 0];
    var up = [zCameraRotation['Z'], 1, 0];
    var cameraMatrix = m4.lookAt(cameraPosition, target, up);

    // Make a view matrix from the camera matrix.
    var viewMatrix = m4.inverse(cameraMatrix);

    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

    gl.useProgram(meshProgramInfo.program);

    // ------ Draw the cube --------

    // Setup all the needed attributes.
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
  });

  main(
    generateShape(gl, m4), 
    {
      u_colorMult: [Math.random(), Math.random(), Math.random(), 1],
      u_matrix: m4.identity(),
    },
    transformations.length-1
  )
  }
};

gui.add(obj, 'Add shape');

