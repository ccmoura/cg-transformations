class Animation {
  static async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static shuffleArray(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  static async generateSmoothedAnimation(actual, target, index, t) {
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
      await this.sleep(10);
      Object.assign(transformations[index], {
        [t]: {
          [Object.keys(transformations[index][t])[0]]: x,
        },
      });
      x += 0.01;
    }
  }
}

const animateOne = {
  "Animate One": async () => {
    if (transformations.length === 0) return;

    const maxValue = 15;
    const index = Math.floor(Math.random() * transformations.length);

    for (const t of Object.keys(
      Animation.shuffleArray(transformations)[index]
    )) {
      await Animation.sleep(300);
      const value =
        transformations[index][t][
          `${Object.keys(transformations[index][t])[0]}`
        ];
      Animation.generateSmoothedAnimation(
        value,
        Math.floor(Math.random() * (value + maxValue)) *
          (Math.round(Math.random()) === 0 ? 1 : -1),
        index,
        t
      );
    }
  },
};
