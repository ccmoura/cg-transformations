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

class Camera {
  static getPosition() {
    return [
      cameraTransformations[Number(activeCamera["Selected Camera"]) - 1].xCamera
        .X,
      cameraTransformations[Number(activeCamera["Selected Camera"]) - 1].yCamera
        .Y,
      (100 -
        cameraTransformations[Number(activeCamera["Selected Camera"]) - 1].zoom
          .Zoom) *
        10,
    ];
  }

  static getTarget(index) {
    return [
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

const animateCamera = {
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
