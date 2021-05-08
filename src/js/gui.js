const loadCameraGui = () => {
  const gui = new dat.GUI();

  const translations = gui.addFolder("Translations");

  translations.close();

  translations
    .add(
      cameraTransformations[Number(activeCamera["Selected Camera"]) - 1]
        .xCamera,
      "X",
      -canvas.width * 2,
      canvas.width * 2,
      1
    )
    .listen()
    .onChange((value) => {
      cameraTransformations[
        Number(activeCamera["Selected Camera"]) - 1
      ].xCamera.X = value;
    });

  translations
    .add(
      cameraTransformations[Number(activeCamera["Selected Camera"]) - 1]
        .yCamera,
      "Y",
      -canvas.width * 2,
      canvas.width * 2,
      1
    )
    .listen()
    .onChange((value) => {
      cameraTransformations[
        Number(activeCamera["Selected Camera"]) - 1
      ].yCamera.Y = value;
    });

  translations
    .add(
      cameraTransformations[Number(activeCamera["Selected Camera"]) - 1].zoom,
      "Zoom",
      0,
      100,
      1
    )
    .listen()
    .onChange((value) => {
      cameraTransformations[
        Number(activeCamera["Selected Camera"]) - 1
      ].zoom.Zoom = value;
    });

  const bezierCamera = gui.addFolder("Bezier Curve Translations");

  bezierCamera.close();

  bezierCamera
    .add(
      cameraTransformations[Number(activeCamera["Selected Camera"]) - 1]
        .p1XBezier,
      "X",
      -canvas.width * 2,
      canvas.width * 2,
      1
    )
    .listen()
    .onChange((value) => {
      cameraTransformations[
        Number(activeCamera["Selected Camera"]) - 1
      ].p1XBezier.X = value;
    });

  bezierCamera
    .add(
      cameraTransformations[Number(activeCamera["Selected Camera"]) - 1]
        .p1YBezier,
      "Y",
      -canvas.width * 2,
      canvas.width * 2,
      1
    )
    .listen()
    .onChange((value) => {
      cameraTransformations[
        Number(activeCamera["Selected Camera"]) - 1
      ].p1YBezier.Y = value;
    });

  bezierCamera
    .add(
      cameraTransformations[Number(activeCamera["Selected Camera"]) - 1]
        .p1ZBezier,
      "Z",
      -canvas.width * 2,
      canvas.width * 2,
      1
    )
    .listen()
    .onChange((value) => {
      cameraTransformations[
        Number(activeCamera["Selected Camera"]) - 1
      ].p1ZBezier.Z = value;
    });
  bezierCamera
    .add(
      cameraTransformations[Number(activeCamera["Selected Camera"]) - 1]
        .p2XBezier,
      "X",
      -canvas.width * 2,
      canvas.width * 2,
      1
    )
    .listen()
    .onChange((value) => {
      cameraTransformations[
        Number(activeCamera["Selected Camera"]) - 1
      ].p2XBezier.X = value;
    });

  bezierCamera
    .add(
      cameraTransformations[Number(activeCamera["Selected Camera"]) - 1]
        .p2YBezier,
      "Y",
      -canvas.width * 2,
      canvas.width * 2,
      1
    )
    .listen()
    .onChange((value) => {
      cameraTransformations[
        Number(activeCamera["Selected Camera"]) - 1
      ].p2YBezier.Y = value;
    });

  bezierCamera
    .add(
      cameraTransformations[Number(activeCamera["Selected Camera"]) - 1]
        .p2ZBezier,
      "Z",
      -canvas.width * 2,
      canvas.width * 2,
      1
    )
    .listen()
    .onChange((value) => {
      cameraTransformations[
        Number(activeCamera["Selected Camera"]) - 1
      ].p2ZBezier.Z = value;
    });

  bezierCamera
    .add(
      cameraTransformations[Number(activeCamera["Selected Camera"]) - 1]
        .tBezier,
      "t",
      0,
      1,
      0.01
    )
    .listen()
    .onChange((value) => {
      cameraTransformations[
        Number(activeCamera["Selected Camera"]) - 1
      ].tBezier.t = value;
    });

  const rotations = gui.addFolder("Axis Rotations");

  rotations.close();

  rotations
    .add(
      cameraTransformations[Number(activeCamera["Selected Camera"]) - 1]
        .xCameraRotation,
      "X",
      -100,
      100,
      1
    )
    .onChange((value) => {
      cameraTransformations[
        Number(activeCamera["Selected Camera"]) - 1
      ].xCameraRotation.X = value;
    });

  rotations
    .add(
      cameraTransformations[Number(activeCamera["Selected Camera"]) - 1]
        .yCameraRotation,
      "Y",
      -100,
      100,
      1
    )
    .onChange((value) => {
      cameraTransformations[
        Number(activeCamera["Selected Camera"]) - 1
      ].yCameraRotation.Y = value;
    });

  rotations
    .add(
      cameraTransformations[Number(activeCamera["Selected Camera"]) - 1]
        .zCameraRotation,
      "Z",
      -100,
      100,
      1
    )
    .onChange((value) => {
      cameraTransformations[
        Number(activeCamera["Selected Camera"]) - 1
      ].zCameraRotation.Z = value;
    });

  const camera = gui.addFolder("Cameras");

  camera.close();

  camera
    .add(activeCamera, "Selected Camera")
    .listen()
    .onFinishChange((value) => {
      if (value <= cameras.length && value >= 1) {
        activeCamera["Selected Camera"] = value;
      } else {
        activeCamera["Selected Camera"] = cameras.length;
      }
    });

  /*

  var pointRotations = gui.addFolder('Point Rotations');

  pointRotations.open();

  pointRotations.add(p1CameraRotation, "X", -100, 100, 1);

  pointRotations.add(p2CameraRotation, "Y", -100, 100, 1);

  pointRotations.add(p3CameraRotation, "Z", -100, 100, 1);

  pointRotations.add(cameraAngle, "angle", 0, 100, 1);

  */
};

const loadGUI = (index) => {
  const gui = new dat.GUI();

  const axisRotations = gui.addFolder("Axis Rotations");

  axisRotations.close();

  axisRotations.add(transformations[index].xRotation, "X", 0, 20, 0.5);

  axisRotations.add(transformations[index].yRotation, "Y", 0, 20, 0.5);

  axisRotations.add(transformations[index].zRotation, "Z", 0, 20, 0.5);

  const pointRotations = gui.addFolder("Point Rotations");

  pointRotations.close();

  pointRotations.add(transformations[index].p1Rotation, "X", -100, 100, 1);

  pointRotations.add(transformations[index].p2Rotation, "Y", -100, 100, 1);

  pointRotations.add(transformations[index].p3Rotation, "Z", -100, 100, 1);

  pointRotations.add(transformations[index].angle, "angle", 0, 100, 1);

  const translations = gui.addFolder("Translations");

  translations.close();

  translations.add(
    transformations[index].xTranslation,
    "X",
    -canvas.width * 2,
    canvas.width * 2,
    1
  );

  translations.add(
    transformations[index].yTranslation,
    "Y",
    -canvas.height * 2,
    canvas.height * 2,
    1
  );

  translations.add(transformations[index].zTranslation, "Z", -100, 100, 0.5);

  const bezierTranslations = gui.addFolder("Bezier Curve Translations");

  bezierTranslations.close();

  bezierTranslations.add(
    transformations[index].p1XBezier,
    "X",
    -canvas.width * 2,
    canvas.width * 2,
    1
  );

  bezierTranslations.add(
    transformations[index].p1YBezier,
    "Y",
    -canvas.height * 2,
    canvas.height * 2,
    1
  );

  bezierTranslations.add(
    transformations[index].p1ZBezier,
    "Z",
    -canvas.height * 2,
    canvas.height * 2,
    1
  );

  bezierTranslations.add(
    transformations[index].p2XBezier,
    "X",
    -canvas.width * 2,
    canvas.width * 2,
    2
  );

  bezierTranslations.add(
    transformations[index].p2YBezier,
    "Y",
    -canvas.height * 2,
    canvas.height * 2,
    1
  );

  bezierTranslations.add(
    transformations[index].p2ZBezier,
    "Z",
    -canvas.height * 2,
    canvas.height * 2,
    1
  );

  bezierTranslations.add(transformations[index].tBezier, "t", 0, 1, 0.01);

  const scales = gui.addFolder("Scales");

  scales.close();

  scales.add(transformations[index].xScale, "X", 1, 10, 0.5);

  scales.add(transformations[index].yScale, "Y", 1, 10, 0.5);

  scales.add(transformations[index].zScale, "Z", 1, 10, 0.5);

  gui.add(
    {
      "Look At": () => {
        xCameraRotation.X = transformations[index].yTranslation.Y;

        yCameraRotation.Y = transformations[index].xTranslation.X;
      },
    },
    "Look At"
  );

  gui.add(followShape, "Follow Shape");
};
