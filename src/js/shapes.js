function generateShape(gl, m4) {
    const shapes = [
        flattenedPrimitives.createCubeBufferInfo(gl, 20), 
        flattenedPrimitives.createCylinderBufferInfo(gl, 20, 20, 80, 10),
        flattenedPrimitives.createSphereBufferInfo(gl, 9, 65, 65),
        flattenedPrimitives.createPlaneBufferInfo(gl, 20, 20, 20, 20, m4.xRotation(Math.PI / 2))
    ];
  
    return shapes[Math.floor(Math.random() * shapes.length)];
}