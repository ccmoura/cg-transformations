const cameras = [
  { cameraPosition: [0, 0, 100], target: [0, 0, 0], up: [0, 1, 0] },
];
const activeCamera = { "Selected Camera": "1" };
const followShape = { "Follow Shape": false };
const p1CameraRotation = { X: 0 };
const p2CameraRotation = { Y: 0 };
const p3CameraRotation = { Z: 0 };
const cameraAngle = { angle: 0 };

const cameraTransformations = [
  {
    xCamera: { X: 0 },
    yCamera: { Y: 0 },
    xCameraRotation: { X: 0 },
    yCameraRotation: { Y: 0 },
    zCameraRotation: { Z: 0 },
    zoom: { Zoom: 80 },
  },
];

const cameraFunctions = {
  "Add Camera": () => {
    cameras.push({
      cameraPosition: [0, 0, 100],
      target: [0, 0, 0],
      up: [0, 1, 0],
    });
    cameraTransformations.push({
      xCamera: { X: 0 },
      yCamera: { Y: 0 },
      xCameraRotation: { X: 0 },
      yCameraRotation: { Y: 0 },
      zCameraRotation: { Z: 0 },
      zoom: { Zoom: 80 },
    });
    activeCamera["Selected Camera"] = cameras.length;
  },
};

const getPosition = () => [
  cameraTransformations[Number(activeCamera["Selected Camera"]) - 1].xCamera.X,
  cameraTransformations[Number(activeCamera["Selected Camera"]) - 1].yCamera.Y,
  (100 -
    cameraTransformations[Number(activeCamera["Selected Camera"]) - 1].zoom
      .Zoom) *
    10,
];
const getTarget = (index) => [
  followShape["Follow Shape"]
    ? transformations[index].xTranslation.X
    : cameraTransformations[Number(activeCamera["Selected Camera"]) - 1]
        .yCameraRotation.Y,
  followShape["Follow Shape"]
    ? transformations[index].yTranslation.Y
    : cameraTransformations[Number(activeCamera["Selected Camera"]) - 1]
        .xCameraRotation.X,
  0,
];

const getUp = () => [
  cameraTransformations[Number(activeCamera["Selected Camera"]) - 1]
    .zCameraRotation.Z,
  1,
  0,
];

const getAllCameraAttributes = (index) => [
  getPosition(),
  getTarget(index),
  getUp(),
];
