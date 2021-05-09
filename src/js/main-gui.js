const loadMainGUI = () => {
  const gui = new dat.GUI();

  gui.add(addShape, "Add Shape");
  gui.add(animateOne, "Animate One");
  gui.add(cameraFunctions, "Add Camera");
  gui.add(cameraFunctions, "Animate Camera");
};
