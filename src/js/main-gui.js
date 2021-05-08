const loadMainGUI = () => {
  const gui = new dat.GUI();

  const addShape = {
    "Add Shape": () => {
      Transformation.generateTransformation();
      main(
        Shape.generateShape(gl),
        {
          u_colorMult: [Math.random(), Math.random(), Math.random(), 1],
          u_matrix: m4.identity(),
        },
        transformations.length - 1
      );
    },
  };

  gui.add(addShape, "Add Shape");
  gui.add(animateOne, "Animate One");
  gui.add(cameraFunctions, "Add Camera");
};
