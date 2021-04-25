function main() {
  const { gl, meshProgramInfo } = initializeWorld();
  
  const shapeTranslation = [0, 0, 0];

  const shapeBufferInfo = generateShape(gl, m4);

  const cubeVAO = twgl.createVAOFromBufferInfo(
    gl,
    meshProgramInfo,
    shapeBufferInfo,
  );

  var fieldOfViewRadians = degToRad(60);

  const shapeUniforms = {
    u_colorMult: [Math.random(), Math.random(), Math.random(), 1],
    u_matrix: m4.identity(),
  };

  function computeMatrix(
    viewProjectionMatrix, 
    translation, 
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

  loadGUI();

  function render() {
    twgl.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, 1, 2000);

    // Compute the camera's matrix using look at.
    var cameraPosition = [0, 0, (100 - zoom['Zoom']) * 10];
    var target = [0, 0, 0];
    var up = [0, 1, 0];
    var cameraMatrix = m4.lookAt(cameraPosition, target, up);

    // Make a view matrix from the camera matrix.
    var viewMatrix = m4.inverse(cameraMatrix);

    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

    gl.useProgram(meshProgramInfo.program);

    // ------ Draw the cube --------

    // Setup all the needed attributes.
    gl.bindVertexArray(cubeVAO);

    shapeUniforms.u_matrix = computeMatrix(
      viewProjectionMatrix,
      shapeTranslation,
      xRotation['X'],
      yRotation['Y'],
      zRotation['Z'],
      xTranslation['X'],
      yTranslation['Y'],
      zTranslation['Z'],
      xScale['X'],
      yScale['Y'],
      zScale['Z'],
      zoom['Zoom']
    );

    // Set the uniforms we just computed
    twgl.setUniforms(meshProgramInfo, shapeUniforms);

    twgl.drawBufferInfo(gl, shapeBufferInfo);
	requestAnimationFrame(render);
  }
     
  requestAnimationFrame(render);
}

main();
