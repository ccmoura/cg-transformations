const xRotation = { 'X Rotation': degToRad(1) };
const yRotation = { 'Y Rotation': degToRad(1) };
const zRotation = { 'Z Rotation': degToRad(1) };

const xTranslation = { 'X': degToRad(1) };
const yTranslation = { 'Y': degToRad(1) };
const zTranslation = { 'Z': degToRad(1) };

const axisRotation = { 'Axis Rotation': degToRad(1) };

const axisInput = {
 'Axis': "[0.2, 0.4, 0.5]"
}

var axis = [0.2, 0.4, 0.5];

const loadGUI = () => {
  const gui = new dat.GUI();
  var folder1 = gui.addFolder('Rotations');
  folder1.open();
  folder1.add(xRotation, "X Rotation", 0, 20, 0.5);
  folder1.add(yRotation, "Y Rotation", 0, 20, 0.5);
  folder1.add(zRotation, "Z Rotation", 0, 20, 0.5);

  var folder1 = gui.addFolder('Translations');
  folder1.open();
  folder1.add(xTranslation, "X", -canvas.width / 2, canvas.width / 2, 0.5);
  folder1.add(yTranslation, "Y", -canvas.height / 2, canvas.height / 2, 0.5);
  folder1.add(zTranslation, "Z", -100, 100, 0.5);
  /*gui.add(axisInput, 'Axis').onFinishChange(function (value) {
    axis = value;
  });
  gui.add(axisRotation, "Axis Rotation", 0, 20, 0.5);
  */
};
