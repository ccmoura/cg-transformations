const transformations = [];

const getScale = (m4, matrix, scales) => m4.scale(matrix, ...scales);

const getRotation = (m4, matrix, rotations) => {
  matrix = m4.xRotate(matrix, rotations[0]);
  matrix = m4.yRotate(matrix, rotations[1]);
  return m4.zRotate(matrix, rotations[2]);
};

const getTranslation = (m4, matrix, translations) =>
  m4.translate(matrix, ...translations);

const getPointRotation = (m4, matrix, pointRotations, angle) =>
  pointRotations[2] === 0 && pointRotations[1] === 0 && pointRotations[0] === 0
    ? matrix
    : m4.axisRotate(
        matrix,
        [pointRotations[0], pointRotations[1], pointRotations[2]],
        angle,
        matrix
      );

const getAllTransformations = (
  m4,
  matrix,
  scales,
  rotations,
  pointRotations,
  translations,
  angle
) => {
  matrix = getScale(m4, matrix, scales);
  matrix = getRotation(m4, matrix, rotations);
  matrix = getPointRotation(m4, matrix, pointRotations, angle);
  return getTranslation(m4, matrix, translations);
};
