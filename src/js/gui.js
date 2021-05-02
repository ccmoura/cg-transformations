const zoom = { 'Zoom': 80 }
const xCamera = { 'X': 0 }
const yCamera = { 'Y': 0 }

const xCameraRotation = { 'X': 0 }
const yCameraRotation = { 'Y': 0 }
const zCameraRotation = { 'Z': 0 }

var cameraFunctions = { 'Add camera': () => {} };

const loadCameraGui = () => {
  const gui = new dat.GUI();

  gui.add(cameraFunctions, 'Add camera');
  var folder1 = gui.addFolder('Translations');
  folder1.close();
  folder1.add(xCamera, "X", -canvas.width * 2, canvas.width * 2, 1)
  folder1.add(yCamera, "Y", -canvas.width * 2, canvas.width * 2, 1)
  folder1.add(zoom, "Zoom", 0, 100, 1);

  var folder2 = gui.addFolder('Rotations');
  folder2.close();
  folder2.add(xCameraRotation, "X", -100, 100, 1)
  folder2.add(yCameraRotation, "Y", -100, 100, 1)
  folder2.add(zCameraRotation, "Z", -100, 100, 1);
}

const loadGUI = (index) => {
  const gui = new dat.GUI();

  var folder1 = gui.addFolder('Rotations');
  folder1.close();
  folder1.add(transformations[index].xRotation, "X", 0, 20, 0.5);
  folder1.add(transformations[index].yRotation, "Y", 0, 20, 0.5);
  folder1.add(transformations[index].zRotation, "Z", 0, 20, 0.5);

  var folder2 = gui.addFolder('Translations');
  folder2.close();
  folder2.add(transformations[index].xTranslation, "X", -canvas.width / 2, canvas.width / 2, 0.5);
  folder2.add(transformations[index].yTranslation, "Y", -canvas.height / 2, canvas.height / 2, 0.5);
  folder2.add(transformations[index].zTranslation, "Z", -100, 100, 0.5);

  var folder3 = gui.addFolder('Scales');
  folder3.close();
  folder3.add(transformations[index].xScale, "X", 1, 10, 0.5);
  folder3.add(transformations[index].yScale, "Y", 1, 10, 0.5);
  folder3.add(transformations[index].zScale, "Z", 1, 10, 0.5);

  
};
