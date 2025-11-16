// Sparkles from https://www.joshwcomeau.com/react/animated-sparkles-in-react/
const path =
  "M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z";

export class Sparkle {
  #root = document.createElement("div");

  constructor(size, color) {
    this.size = size;
    this.color = color;

    this.#createHtml();
  }

  #createHtml() {
    this.#root.classList.add("sparkleWrapper");
    this.#root.style.width = this.size;

    const oOuterSparkle = document.createElement("div");
    oOuterSparkle.classList.add("outerSparkle");
    oOuterSparkle.style.width = this.size;

    const oInnerSparkle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    oInnerSparkle.setAttribute("viewBox", "0 0 68 68");
    oInnerSparkle.innerHTML = `<path d="${path}" fill="${this.color}"/>`;
    oInnerSparkle.classList.add("innerSparkle");
    oInnerSparkle.style.width = this.size;

    oOuterSparkle.appendChild(oInnerSparkle);
    this.#root.appendChild(oOuterSparkle);
  }

  getDomRef() {
    return this.#root;
  }

  destroy() {
    this.#root.remove();
  }
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function runSparkle(
  target,
  size,
  colors = ["yellow", "white", "gold", "orange"],
  animationLength
) {
  const deferred = Promise.withResolvers();

  const color = colors[Math.floor(Math.random() * colors.length)];
  const sparkle = new Sparkle(size, color);
  const domRef = sparkle.getDomRef();
  domRef.style.top = Math.random() * 100 + "%";
  domRef.style.left = Math.random() * 100 + "%";
  domRef.style.setProperty("--animation-length", `${animationLength}ms`);
  target.appendChild(domRef);

  setTimeout(deferred.resolve, animationLength);

  return deferred.promise.then(() => {
    sparkle.destroy();
  });
}

export async function sparklify(
  target,
  size,
  colors = ["yellow", "white", "gold", "orange"],
  animationLength,
  initialDelay = 0
) {
  const pauseMin = 100;
  const pauseMax = 500;
  const animationLengthMin = animationLength;
  const animationLengthMax = animationLength * 1.6;

  await wait(initialDelay);

  while (true) {
    const randomAnimationLength =
      Math.random() * (animationLengthMax - animationLengthMin) +
      animationLengthMin;
    await runSparkle(target, size, colors, randomAnimationLength);
    const pauseDuration = Math.random() * (pauseMax - pauseMin) + pauseMin;
    await wait(pauseDuration);
  }
}
