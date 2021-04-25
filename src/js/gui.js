const xRotation = { 'X': degToRad(1) };
const yRotation = { 'Y': degToRad(1) };
const zRotation = { 'Z': degToRad(1) };

const xTranslation = { 'X': degToRad(1) };
const yTranslation = { 'Y': degToRad(1) };
const zTranslation = { 'Z': degToRad(1) };

const xScale = { 'X': 1 };
const yScale = { 'Y': 1 };
const zScale = { 'Z': 1 };

const zoom = { 'Zoom': 80 }

const loadGUI = () => {
  const gui = new dat.GUI();
  var folder1 = gui.addFolder('Rotations');
  folder1.close();
  folder1.add(xRotation, "X", 0, 20, 0.5);
  folder1.add(yRotation, "Y", 0, 20, 0.5);
  folder1.add(zRotation, "Z", 0, 20, 0.5);

  var folder2 = gui.addFolder('Translations');
  folder2.close();
  folder2.add(xTranslation, "X", -canvas.width / 2, canvas.width / 2, 0.5);
  folder2.add(yTranslation, "Y", -canvas.height / 2, canvas.height / 2, 0.5);
  folder2.add(zTranslation, "Z", -100, 100, 0.5);

  var folder3 = gui.addFolder('Scales');
  folder3.close();
  folder3.add(xScale, "X", 1, 10, 0.5);
  folder3.add(yScale, "Y", 1, 10, 0.5);
  folder3.add(zScale, "Z", 1, 10, 0.5);

  var folder4 = gui.addFolder('Camera');
  folder4.close();
  folder4.add(zoom, "Zoom", 0, 100, 1);
  
};
