
function disableScroll() {
  window.document.getElementById("scrollable").style.overflowY = "scroll";
}

function enableScroll() {
  window.document.getElementById("scrollable").style.overflowY = "scroll";
};

export { disableScroll, enableScroll };