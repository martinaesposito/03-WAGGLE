////FULL SCREEN
function openFullscreen() {
  var elem = document.documentElement;

  if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
  console.log("done");

  document.querySelector("#zzz").remove();
}
///CTN
let ctn = document.getElementById("ctn");
ctn.style.height = hhheight + "px";
ctn.style.width = wwwidth + "px";

////LOGO
let logoCtn = document.getElementById("logo-ctn");
let doggo = document.getElementById("doggo");
doggo.style.width = pixelW * 29 + "px";
doggo.style.marginBottom = pixelH * 6 + "px";
logoCtn.style.gap = pixelH * 2 + "px";

////LOADING
let loadingCtn = document.getElementById("progress-ctn");
loadingCtn.style.width = pixelW * 54 + "px";
loadingCtn.style.height = pixelW * 8 + "px";

///NEWSPAPER
let newspaperCtn = document.getElementById("newspaper-ctn");
let newspaper = document.getElementById("newspaper");
newspaper.style.padding = pixelH * 4 + "px";
newspaper.style.height = pixelH * 145 + "px";
newspaper.style.gap = pixelH * 4 + "px";

//CONTENT
let content = document.getElementById("content");
content.style.gap = pixelH * 4 + "px";

// let start = document.getElementById("start");

// CARICAMENTO SIMULATO
window.addEventListener("load", (event) => {
  console.log("page is fully loaded");

  setTimeout(function () {
    ctn.style.justifyContent = "flex-start";

    newspaperCtn.style.display = "flex";

    logoCtn.classList = "hidden";
    loadingCtn.classList = "hidden";

    next.style.display = "block";
  }, 2000);
});

// NEXT
let ok = document.getElementById("next");
ok.style.marginTop = "auto";
