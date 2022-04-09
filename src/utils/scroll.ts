
function disableScroll() {
  window.document.body.style.overflowY = "hidden";
}

function enableScroll() {
  window.document.body.style.overflowY = "scroll";
};

export { disableScroll, enableScroll };