const transformations = [];

class Transformation {
  static generateTransformation() {
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
      p1XBezier: { X: 0 },
      p1YBezier: { Y: 0 },
      p1ZBezier: { Z: 0 },
      p2XBezier: { X: 0 },
      p2YBezier: { Y: 0 },
      p2ZBezier: { Z: 0 },
      tBezier: { t: 0 },
    });
  }

  static getScale(m4, matrix, scales) {
    return m4.scale(matrix, ...scales);
  }

  static getRotation(m4, matrix, rotations) {
    matrix = m4.xRotate(matrix, rotations[0]);
    matrix = m4.yRotate(matrix, rotations[1]);
    return m4.zRotate(matrix, rotations[2]);
  }

  static getTranslation(m4, matrix, translations) {
    return m4.translate(matrix, ...translations);
  }

  static getPointRotation(m4, matrix, pointRotations, angle) {
    return pointRotations[2] === 0 &&
      pointRotations[1] === 0 &&
      pointRotations[0] === 0
      ? matrix
      : m4.axisRotate(
          matrix,
          [pointRotations[0], pointRotations[1], pointRotations[2]],
          angle,
          matrix
        );
  }

  static getBezier(m4, matrix, p1Bezier, p2Bezier, t, index) {
    const source = [
      transformations[index].xTranslation.X,
      transformations[index].yTranslation.Y,
      transformations[index].zTranslation.Z,
    ];

    p1Bezier[0] = p1Bezier[0].X;
    p1Bezier[1] = p1Bezier[1].Y;
    p1Bezier[2] = p1Bezier[2].Z;
    p2Bezier[0] = p2Bezier[0].X;
    p2Bezier[1] = p2Bezier[1].Y;
    p2Bezier[2] = p2Bezier[2].Z;

    t = t.t;
    if (t > 1) t = 1;
    if (t < 0) t = 0;

    return m4.translate(
      matrix,
      ...source.map(
        (initialPoint, i) =>
          (1 - t) ** 2 * initialPoint +
          2 * t * (1 - t) * p1Bezier[i] +
          t ** 2 * p2Bezier[i]
      )
    );
  }

  static getAllTransformations(
    m4,
    matrix,
    scales,
    rotations,
    pointRotations,
    translations,
    p1Bezier,
    p2Bezier,
    t,
    angle,
    index
  ) {
    matrix = this.getScale(m4, matrix, scales);
    matrix = this.getRotation(m4, matrix, rotations);
    matrix = this.getPointRotation(m4, matrix, pointRotations, angle);
    matrix = this.getBezier(m4, matrix, p1Bezier, p2Bezier, t, index);
    return this.getTranslation(m4, matrix, translations);
  }
}
