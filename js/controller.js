/* global hljs */

'use strict';

document.addEventListener(`DOMContentLoaded`, ev => {
  const $$ = query => document.querySelectorAll(query),
        container = $$(`.container`)[0],
        slides    = $$(`.slide`);

  const slideMap = new Map();
  for (let i = 0; i < slides.length; i += 1) {
    slideMap.set(slides[i].id, i);
  }

  // create a progress bar in the container
  const footer = document.createElement(`footer`),
        progress = document.createElement(`div`);

  progress.setAttribute(`class`, `progress`);
  footer.appendChild(progress);

  container.appendChild(footer);

  let currentIndex = 0;

  const goToSlideAt = nextIndex => {
    if (nextIndex < 0 || slides.length <= nextIndex) { return false; }

    slides[currentIndex].style.opacity = 0;
    slides[currentIndex].style.zIndex  = 0;

    slides[nextIndex].style.opacity = 1;
    slides[nextIndex].style.zIndex  = 1;

    currentIndex = nextIndex;
    return true;
  };

  const updateProgressBar = () => {
    const bar = $$(`.progress`)[0],
          ratio = `${currentIndex / (slides.length - 1)}`;
    bar.style.width = `calc(${container.clientWidth}px * ${ratio}`;
    return true;
  };

  const goToSlideOf = slideID => {
    const index = slideMap.get(slideID);
    if (index === undefined) { return false; } // unknown slideID

    return goToSlideAt(index) && updateProgressBar();
  };

  window.addEventListener(`hashchange`, ev => {
    const slideID = location.hash.slice(1);
    goToSlideOf(slideID);
  }, false);

  // keyboard events and listeners
  const goForward = () => {
    if (currentIndex >= slides.length - 1) { return; }

    const slideID = slides[currentIndex + 1].id;
    location.hash = slideID;
  };

  const goBack = () => {
    if (currentIndex <= 0) { return; }

    const slideID = slides[currentIndex - 1].id;
    location.hash = slideID;
  };

  // eslint-disable-next-line consistent-return
  document.addEventListener(`keydown`, ev => {
    if (ev.key) {
      switch (ev.key) {
        case `ArrowRight`:
        case `ArrowDown`:
        case `l`:
        case `j`:
        case `Enter`:
        case ` `:
          ev.preventDefault();
          return goForward();

        case `ArrowLeft`:
        case `ArrowUp`:
        case `h`:
        case `k`:
        case `Backspace`:
          ev.preventDefault();
          return goBack();

        // no default
      }
    } else if (ev.keyCode) {
      switch (ev.keyCode) {
        case 39:
        case 40:
        case 76:
        case 74:
        case 13:
        case 32:
          ev.preventDefault();
          return goForward();

        case 37:
        case 38:
        case 72:
        case 75:
        case  8:
          ev.preventDefault();
          return goBack();

        // no default
      }
    }
  }, false);

  // resize events and listeners
  const adjustScale = () => {
    const factor = Math.min(
      window.innerWidth  / container.clientWidth,
      window.innerHeight / container.clientHeight
    );
    container.style.transform = `scale(${factor})`;
  };

  window.addEventListener(`resize`, adjustScale, false);

  // first view
  hljs.initHighlightingOnLoad();
  adjustScale();
  if (!goToSlideOf(location.hash.slice(1))) {
    location.hash = slides[0].id;  // default
  }
});
