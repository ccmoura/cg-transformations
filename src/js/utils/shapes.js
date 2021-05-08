class Shape {
  static generateShape(gl) {
    const shapes = [
      flattenedPrimitives.createCubeBufferInfo(gl, 20),
      flattenedPrimitives.createCylinderBufferInfo(gl, 20, 20, 80, 10),
      flattenedPrimitives.createSphereBufferInfo(gl, 9, 65, 65),
    ];

    return shapes[Math.floor(Math.random() * shapes.length)];
  }
}
