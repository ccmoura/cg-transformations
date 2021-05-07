const zoom = { 'Zoom': 80 };
const xCamera = { 'X': 0 };
const yCamera = { 'Y': 0 };

const xCameraRotation = { 'X': 0 };
const yCameraRotation = { 'Y': 0 };
const zCameraRotation = { 'Z': 0 };

const p1CameraRotation = { 'X': 0 };
const p2CameraRotation = { 'Y': 0 };
const p3CameraRotation = { 'Z': 0 };
const cameraAngle = { 'angle': 0 };

const followShape = { 'Follow Shape': false };

var cameraFunctions = { 'Add camera': () => {}  };

const loadCameraGui = () => {
  const gui = new dat.GUI();

  gui.add(cameraFunctions, 'Add camera');
  var translations = gui.addFolder('Translations');
  translations.close();
  translations.add(xCamera, "X", -canvas.width * 2, canvas.width * 2, 1)
  translations.add(yCamera, "Y", -canvas.width * 2, canvas.width * 2, 1)
  translations.add(zoom, "Zoom", 0, 100, 1);

  var rotations = gui.addFolder('Axis Rotations');
  rotations.close();
  rotations.add(xCameraRotation, "X", -100, 100, 1)
  rotations.add(yCameraRotation, "Y", -100, 100, 1)
  rotations.add(zCameraRotation, "Z", -100, 100, 1);
/*
  var pointRotations = gui.addFolder('Point Rotations');
  pointRotations.open();
  pointRotations.add(p1CameraRotation, "X", -100, 100, 1);
  pointRotations.add(p2CameraRotation, "Y", -100, 100, 1);
  pointRotations.add(p3CameraRotation, "Z", -100, 100, 1);
  pointRotations.add(cameraAngle, "angle", 0, 100, 1);
  */
}

const loadGUI = (index) => {
  const gui = new dat.GUI();

  var axisRotations = gui.addFolder('Axis Rotations');
  axisRotations.close();
  axisRotations.add(transformations[index].xRotation, "X", 0, 20, 0.5);
  axisRotations.add(transformations[index].yRotation, "Y", 0, 20, 0.5);
  axisRotations.add(transformations[index].zRotation, "Z", 0, 20, 0.5)
  
  var pointRotations = gui.addFolder('Point Rotations');
  pointRotations.close();
  pointRotations.add(transformations[index].p1Rotation, "X", -100, 100, 1);
  pointRotations.add(transformations[index].p2Rotation, "Y", -100, 100, 1);
  pointRotations.add(transformations[index].p3Rotation, "Z", -100, 100, 1);
  pointRotations.add(transformations[index].angle, "angle", 0, 100, 1);

  var translations = gui.addFolder('Translations');
  translations.close();
  translations.add(transformations[index].xTranslation, "X", -canvas.width * 2, canvas.width * 2, 1);
  translations.add(transformations[index].yTranslation, "Y", -canvas.height * 2, canvas.height * 2, 1);
  translations.add(transformations[index].zTranslation, "Z", -100, 100, 0.5);

  var scales = gui.addFolder('Scales');
  scales.close();
  scales.add(transformations[index].xScale, "X", 1, 10, 0.5);
  scales.add(transformations[index].yScale, "Y", 1, 10, 0.5);
  scales.add(transformations[index].zScale, "Z", 1, 10, 0.5);

  gui.add({'Look At': () => {
    xCameraRotation['X'] = transformations[index].yTranslation['Y'];
    yCameraRotation['Y'] = transformations[index].xTranslation['X'];
  }}, "Look At");

  gui.add(followShape, "Follow Shape");  
};
