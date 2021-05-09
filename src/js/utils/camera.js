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
    p1XBezier: { X: 0 },
    p1YBezier: { Y: 0 },
    p1ZBezier: { Z: 0 },
    p2XBezier: { X: 0 },
    p2YBezier: { Y: 0 },
    p2ZBezier: { Z: 0 },
    tBezier: { t: 0 },
  },
];

class Camera {
  static getCameraBezier(source, p1Bezier, p2Bezier, t) {
    if (t > 1) t = 1;
    if (t < 0) t = 0;

    return source.map(
      (initialPoint, i) =>
        (1 - t) ** 2 * initialPoint +
        2 * t * (1 - t) * p1Bezier[i] +
        t ** 2 * p2Bezier[i]
    );
  }

  static getPosition() {
    const cameraIndex = Number(activeCamera["Selected Camera"]) - 1;
    return this.getCameraBezier(
      [
        cameraTransformations[cameraIndex].xCamera.X,
        cameraTransformations[cameraIndex].yCamera.Y,
        (100 - cameraTransformations[cameraIndex].zoom.Zoom) * 10,
      ],
      [
        cameraTransformations[cameraIndex].p1XBezier.X,
        cameraTransformations[cameraIndex].p1YBezier.Y,
        cameraTransformations[cameraIndex].p1ZBezier.Z,
      ],
      [
        cameraTransformations[cameraIndex].p2XBezier.X,
        cameraTransformations[cameraIndex].p2YBezier.Y,
        cameraTransformations[cameraIndex].p2ZBezier.Z,
      ],
      cameraTransformations[cameraIndex].tBezier.t
    );
  }

  static getTarget(index) {
    const cameraIndex = Number(activeCamera["Selected Camera"]) - 1;
    return [
      followShape["Follow Shape"]
        ? transformations[index].xTranslation.X
        : cameraTransformations[cameraIndex].yCameraRotation.Y,
      followShape["Follow Shape"]
        ? transformations[index].yTranslation.Y
        : cameraTransformations[cameraIndex].xCameraRotation.X,
      followShape["Follow Shape"]
        ? transformations[index].zTranslation.Z
        : cameraTransformations[cameraIndex].zCameraRotation.Z,
    ];
  }

  static getUp() {
    return [
      cameraTransformations[Number(activeCamera["Selected Camera"]) - 1]
        .zCameraRotation.Z,
      1,
      0,
    ];
  }

  static getAllCameraAttributes(index) {
    return [this.getPosition(), this.getTarget(index), this.getUp()];
  }

  static async generateSmoothedAnimation(actual, target, index, t, v) {
    let x;
    let y;
    if (actual < target) {
      x = Math.floor(actual);
      y = Math.floor(target);
    } else {
      x = Math.floor(target);
      y = Math.floor(actual);
    }

    while (x !== y) {
      await Animation.sleep(10);
      cameras[index][t][v] = x;
      x += 0.01;
    }
  }
}

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
      p1XBezier: { X: 0 },
      p1YBezier: { Y: 0 },
      p1ZBezier: { Z: 0 },
      p2XBezier: { X: 0 },
      p2YBezier: { Y: 0 },
      p2ZBezier: { Z: 0 },
      tBezier: { t: 0 },
    });
    activeCamera["Selected Camera"] = cameras.length;
  },
  "Animate Camera": async () => {
    const maxValue = 15;
    const index = Math.floor(Math.random() * cameras.length);

    for (const t of Object.keys(
      Animation.shuffleArray(
        cameras.map((camera) => ({
          cameraPosition: camera.cameraPosition,
          target: camera.target,
        }))
      )[index]
    )) {
      for (const v in cameras[index][t]) {
        await Animation.sleep(300);
        const value = cameras[index][t][v];
        Camera.generateSmoothedAnimation(
          value,
          Math.floor(Math.random() * (value + maxValue)) *
            (Math.round(Math.random()) === 0 ? 1 : -1),
          index,
          t,
          v
        );
      }
    }
  },
};
