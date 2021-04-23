const xRotation = { 'X Rotation': degToRad(1) };
const yRotation = { 'Y Rotation': degToRad(1) };
const axisRotation = { 'Axis Rotation': degToRad(1) };

const axisInput = {
 'Axis': "[0.2, 0.4, 0.5]"
}

var axis = [0.2, 0.4, 0.5];

const loadGUI = () => {
  const gui = new dat.GUI();
  gui.add(xRotation, "X Rotation", 0, 20, 0.5);
  gui.add(yRotation, "Y Rotation", 0, 20, 0.5);
  /*gui.add(axisInput, 'Axis').onFinishChange(function (value) {
    axis = value;
  });
  gui.add(axisRotation, "Axis Rotation", 0, 20, 0.5);
  */
};
