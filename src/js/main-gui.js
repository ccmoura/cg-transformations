const loadMainGUI = () => {
  const gui = new dat.GUI();

  const addShape = {
    "Add Shape": () => {
      transformations.push({
        xRotation: { X: degToRad(1) },
        yRotation: { Y: degToRad(1) },
        zRotation: { Z: degToRad(1) },
        xTranslation: { X: degToRad(1) },
        yTranslation: { Y: degToRad(1) },
        zTranslation: { Z: degToRad(1) },
        xScale: { X: 1 },
        yScale: { Y: 1 },
        zScale: { Z: 1 },
        p1Rotation: { X: 0 },
        p2Rotation: { Y: 0 },
        p3Rotation: { Z: 0 },
        angle: { angle: degToRad(0) },
      });

      main(
        generateShape(gl, m4),
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
