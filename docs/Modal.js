const modal = document.getElementById("modal");

export function openModal(target, skipAnimation) {
  const modal = document.getElementById("modal");

  if (skipAnimation) {
    modal.showModal();
    return;
  }

  const width = target.offsetWidth;
  const height = width; // assume square, image is loaded lazily
  const posX = target.getBoundingClientRect().left + width / 2;
  const posY = target.getBoundingClientRect().top + height / 2;

  const animationWrapper = document.createElement("div");
  animationWrapper.classList.add("snowflake");
  animationWrapper.style.left = `${posX}px`;
  animationWrapper.style.top = `${posY}px`;

  const animationDiv = document.createElement("div");
  animationDiv.classList.add("snowflake-inner");
  animationDiv.innerHTML = snowflake;

  const backgroundColor = document.createElement("div");
  backgroundColor.style.position = "fixed";
  backgroundColor.style.left = "0px";
  backgroundColor.style.top = "0px";
  backgroundColor.style.right = "0px";
  backgroundColor.style.bottom = "0px";
  backgroundColor.classList.add("snowflake-background");

  animationWrapper.appendChild(animationDiv);
  document.body.appendChild(animationWrapper);
  document.body.appendChild(backgroundColor);

  setTimeout(() => {
    modal.showModal();
    animationWrapper.remove();
    backgroundColor.remove();
  }, 1800);
}
