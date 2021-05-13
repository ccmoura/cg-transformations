const { gl, meshProgramInfo } = initializeWorld();

function main(shapeBufferInfo, shapeUniforms, index) {
  const VAO = twgl.createVAOFromBufferInfo(
    gl,
    meshProgramInfo,
    shapeBufferInfo
  );

  const fieldOfViewRadians = degToRad(60);

  function computeMatrix(
    matrix,
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
    p1XBezier,
    p1YBezier,
    p1ZBezier,
    p2XBezier,
    p2YBezier,
    p2ZBezier,
    t,
    angle
  ) {
    return Transformation.getAllTransformations(
      m4,
      matrix,
      [xScale, yScale, zScale],
      [xRotation, yRotation, zRotation],
      [p1Rotation, p2Rotation, p3Rotation],
      [xTranslation, yTranslation, zTranslation],
      [p1XBezier, p1YBezier, p1ZBezier],
      [p2XBezier, p2YBezier, p2ZBezier],
      t,
      angle,
      index
    );
  }

  loadGUI(index, m4);

  function render() {
    twgl.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const projectionMatrix = m4.perspective(
      fieldOfViewRadians,
      aspect,
      1,
      2000
    );

    const cameraMatrix = m4.lookAt(...Camera.getAllCameraAttributes(index));

    const pointRotatedCamera = m4.axisRotate(
      cameraMatrix,
      [cameraTransformations[Number(activeCamera["Selected Camera"]) - 1].xCameraPointRotation.X, 
      cameraTransformations[Number(activeCamera["Selected Camera"]) - 1].yCameraPointRotation.Y, 
      cameraTransformations[Number(activeCamera["Selected Camera"]) - 1].zCameraPointRotation.Z], 
      cameraTransformations[Number(activeCamera["Selected Camera"]) - 1].cameraPointRotationAngle.angle,
      cameraMatrix);

    const viewMatrix = m4.inverse(pointRotatedCamera);

    const viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

    gl.useProgram(meshProgramInfo.program);

    gl.bindVertexArray(VAO);

    shapeUniforms.u_matrix = computeMatrix(
      viewProjectionMatrix,
      transformations[index].xRotation.X,
      transformations[index].yRotation.Y,
      transformations[index].zRotation.Z,
      transformations[index].xTranslation.X,
      transformations[index].yTranslation.Y,
      transformations[index].zTranslation.Z,
      transformations[index].xScale.X,
      transformations[index].yScale.Y,
      transformations[index].zScale.Z,
      transformations[index].p1Rotation.X,
      transformations[index].p2Rotation.Y,
      transformations[index].p3Rotation.Z,
      transformations[index].p1XBezier,
      transformations[index].p1YBezier,
      transformations[index].p1ZBezier,
      transformations[index].p2XBezier,
      transformations[index].p2YBezier,
      transformations[index].p2ZBezier,
      transformations[index].tBezier,
      transformations[index].angle.angle
    );

    twgl.setUniforms(meshProgramInfo, shapeUniforms);

    twgl.drawBufferInfo(gl, shapeBufferInfo);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

loadMainGUI();
loadCameraGui();
