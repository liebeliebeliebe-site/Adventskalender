// Generated on https://www.misha.studio/snowflaker/
const snowflake = `
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 60 70" width="60" height="70">
	<g fill="none" fill-rule="nonzero" stroke="#ffffff" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
		<g id="Snowflake">
      <g>
        <path d="M 
          34.83178,45.7492
          30,40.9174
          25.16822,45.7492
          
          23.1068,44.5591
          24.8754,37.9587
          18.2750,36.1902
          
          18.2750,33.8098
          24.8754,32.0413
          23.1068,25.4409

          25.16822,24.25077
          30,29.0826
          34.83178,24.25077

          36.89321,25.44094
          35.12465,32.04128
          41.72499,33.80984
          
          41.72499,36.1902
          35.12465,37.9587
          36.89321,44.5591
          " fill="#6bc6e2" stroke="none"/>
      </g>
			<g>
				<line x1="30" y1="35" x2="30" y2="1.66667" />
				<polyline points="34.83178,24.25077 30,29.0826 25.16822,24.25077" />
				<polyline points="38.44748,14.10959 30,22.5571 21.55252,14.10959" />
				<polyline points="34.03527,7.98236 30,12.0176 25.96473,7.98236" />
			</g>
			<g>
				<line x1="30" y1="35" x2="58.86751" y2="18.33333" />
				<polyline points="41.72499,33.80984 35.12465,32.04128 36.89321,25.44094" />
				<polyline points="52.3154,31.8705 40.7759,28.7785 43.8679,17.2391" />
				<polyline points="55.4156,24.9858 49.9033,23.5088 51.3803,17.9965" />
			</g>
			<g>
				<line x1="30" y1="35" x2="58.86751" y2="51.66667" />
				<polyline points="36.89321,44.5591 35.12465,37.9587 41.72499,36.1902" />
				<polyline points="43.8679,52.7609 40.7759,41.2215 52.31537,38.1295" />
				<polyline points="51.3803,52.0035 49.9033,46.4912 55.4156,45.0142" />
			</g>
			<g>
				<line x1="30" y1="35" x2="30" y2="68.33333" />
				<polyline points="25.16822,45.7492 30,40.9174 34.83178,45.7492" />
				<polyline points="21.55252,55.8904 30,47.4429 38.44748,55.8904" />
				<polyline points="25.96473,62.0176 30,57.9824 34.03527,62.0176" />
			</g>
			<g>
				<line x1="30" y1="36" x2="1.13249" y2="51.66667" />
				<polyline points="18.2750,36.1902 24.8754,37.9587 23.1068,44.5591" />
				<polyline points="7.6846,38.1295 19.2241,41.2215 16.1321,52.7609" />
				<polyline points="4.5844,45.0142 10.0967,46.4912 8.6197,52.0035" />
			</g>
			<g>
				<line x1="30" y1="35" x2="1.13249" y2="18.33333" />
				<polyline points="23.1068,25.4409 24.8754,32.0413 18.2750,33.8098" />
				<polyline points="16.1321,17.2391 19.2241,28.7785 7.6846,31.8705" />
				<polyline points="8.6197,17.9965 10.0967,23.5088 4.5844,24.9858" />
			</g>
		</g>
	</g>
</svg>
`;

const modal = document.getElementById("modal");

export function setModalTitle(title) {
  const titleElement = modal.querySelector(".modal-title");
  titleElement.innerText = title;
}

export function setModalImage(src) {
  const imageElement = document.getElementById("modal-image");
  imageElement.src = "";
  imageElement.src = src;
}

export function openModal(target, skipAnimation) {
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
  animationWrapper.appendChild(animationDiv);

  const backgroundColor = document.createElement("div");
  backgroundColor.style.position = "fixed";
  backgroundColor.style.left = "0px";
  backgroundColor.style.top = "0px";
  backgroundColor.style.right = "0px";
  backgroundColor.style.bottom = "0px";
  backgroundColor.classList.add("snowflake-background");

  document.body.appendChild(animationWrapper);
  document.body.appendChild(backgroundColor);

  setTimeout(() => {
    modal.showModal();
    animationWrapper.remove();
    backgroundColor.remove();
  }, 1800);
}
