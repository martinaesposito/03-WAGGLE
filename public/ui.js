// KEY
//leggo i parametri dall'url per andare a leggere il sessionstorage
params = new URLSearchParams(document.location.search);
name = params.get("key");

storedUserData = sessionStorage.getItem(name); // Use sessionStorage
userData = storedUserData ? JSON.parse(storedUserData) : null;

console.log(userData);
// //////////////////////////////////////////////////////////////////

//PROPORZIONI DELLO SCHERMO
hhheight = window.innerHeight - 22 * (window.innerHeight / 172);
wwwidth = hhheight * 0.46;

/////PIXEL ADAPT
//pixel proportion!!!!
pixelW = wwwidth / 80;
pixelH = hhheight / 172;

// Get the elements della UI
let dropdownMenu = document.getElementById("menu-container");
let mappaDezoom = document.getElementById("mappa-dezoom");
let createOsso = document.getElementById("osso");
let profileBtn = document.getElementById("profile");
let waggleGallery = document.getElementById("gallery");

let btns = document.getElementsByClassName("btn");
let btnImgs = document.getElementsByClassName("btn-img");

btnImgs.forEach(function (bI) {
  bI.style.height = `${pixelH * 16}px`;
});
btnImgs[2].style.height = `${pixelH * 14}px`; //il cuoricino è più piccolo

// MENU

let arrayMenu = document.getElementsByClassName("menu-opt");
let arrayImgMenu = document.getElementsByClassName("menu-img");

let incInitial = pixelH * 8;
let links = ["card.html", "guardaroba.html", "gallery.html"];

Array.from(arrayImgMenu).forEach((e) => {
  e.style.height = `${pixelH * 16}px`;
  e.style.margin = "auto";
});

profileBtn.addEventListener("click", (e) => {
  console.log("Profile button clicked");
  inc = incInitial; // Reset inc to its initial value whenever profileBtn is clicked

  for (let i = 0; i < arrayMenu.length; i++) {
    // Toggle the 'show' and 'hide' classes
    arrayMenu[i].classList.toggle("show");
    arrayMenu[i].classList.toggle("hide");
    arrayMenu[i].style.setProperty("--top-position", `${inc}px`);
    inc += pixelH * 20;
  }
});

for (let i = 0; i < arrayMenu.length; i++) {
  arrayMenu[i].addEventListener("click", (e) => {
    if (i == 0) {
      window.open(links[0] + "?key=" + name + "&page=map", "_self");
    } else if (i == 1) {
      window.open(links[1] + "?key=" + name, "_self");
    }
  });
}

waggleGallery.addEventListener("click", (e) => {
  window.open(links[2] + "?key=" + name, "_self");
});

//IMG
let profileImg = document.getElementById("profile-img");
profileImg.src =
  "assets/images/cani-profile/" + userData.breed.toUpperCase() + "-MASK.png";
profileImg.style.height = `${pixelH * 15}px`;

// //////////////////////////////////////////////////////////////////////////
// OSSO CREATE
let ossoDiv = document.getElementById("osso-message");
ossoDiv.style.height = hhheight + "px";
ossoDiv.style.width = wwwidth + "px";

let ossoM = document.getElementById("text-osso");

ossoM.style.padding = pixelH * 4 + "px";
ossoM.style.height = pixelH * 130 + "px";
ossoM.style.width = wwwidth + "px";
ossoM.style.backgroundColor = "white";

let regalo = document.getElementById("regalo");

regalo.style.position = "absolute";
regalo.style.height = pixelH * 15 + "px";
regalo.style.width = pixelW * 13 + "px";
regalo.style.right = `${(window.innerWidth - wwwidth) / 2 + pixelH * 4}px`;
regalo.style.top = `${pixelH * 143}px`;

createOsso.addEventListener("click", () => {
  ossoM.value = "";
  ossoM.innerHTML = "";
  ossoDiv.classList.toggle("hidden");
  dropdownMenu.classList.toggle("hidden");
  waggleGallery.classList.toggle("hidden");
  mappaDezoom.classList.toggle("hidden");
});

let closeCreate = document.getElementById("close-osso-create");
closeCreate.style.height = pixelH * 14 + "px";
closeCreate.style.width = pixelW * 16 + "px";
closeCreate.addEventListener("click", (event) => {
  ossoM.value = "";
  ossoM.innerHTML = ";";
  event.preventDefault();
  ossoDiv.classList.toggle("hidden");
  dropdownMenu.classList.toggle("hidden");
  waggleGallery.classList.toggle("hidden");
  mappaDezoom.classList.toggle("hidden");
});

// OSSO FOUND
let closeFound = document.getElementById("close-osso-found");
closeFound.style.height = pixelH * 14 + "px";
closeFound.style.width = pixelW * 16 + "px";

let ossoFoundDiv = document.getElementById("osso-found");
ossoFoundDiv.classList.add("flex-col");
ossoFoundDiv.style.height = pixelH * 100 + "px";
ossoFoundDiv.style.width = wwwidth + "px";

let ossoWarn = document.getElementById("osso-warn");
ossoWarn.style.backgroundColor = "white";
ossoWarn.style.padding = pixelH * 4 + "px";
ossoWarn.style.height = pixelH * 60 + "px";
ossoWarn.style.justifyContent = "center";
ossoWarn.style.gap = pixelH * 6 + "px";

let ossoImg = document.getElementById("osso-found-icon");
ossoImg.style.width = pixelW * 26 + "px";
ossoImg.style.margin = "0 auto";

closeFound.addEventListener("click", (event) => {
  event.preventDefault();
  ossoFoundDiv.classList.toggle("hidden");
  dropdownMenu.classList.toggle("hidden");
  waggleGallery.classList.toggle("hidden");
  mappaDezoom.classList.toggle("hidden");

  clientSocket.emit("statoUpdate", { id: clientSocket.id, stato: false });
});

// //////////////////////////////////////////////////////////////////
// WAGGLE
//request
const closeWaggle = document.getElementById("close-waggle");
const waggleDiv = document.getElementById("waggle-ctn");
waggleDiv.classList.add("flex-col");
waggleDiv.style.height = pixelH * 140 + "px";
waggleDiv.style.width = wwwidth + "px";

const waggleWarn = document.getElementById("waggle-warn");
waggleWarn.style.backgroundColor = "white";
waggleWarn.style.height = pixelH * 100 + "px";
waggleWarn.style.justifyContent = "space-between";
waggleWarn.style.padding = pixelH * 6 + "px";
waggleWarn.style.paddingBottom = pixelH * 12 + "px";

const waggleImg = document.getElementById("waggle-user-img");

const countdown = document.getElementById("countdown");
const waggleWarnTxt = document.getElementById("waggle-warn-txt");

let nCount = 10;
countdown.innerHTML = nCount;
countdown.style.right = `${(window.innerWidth - wwwidth) / 2 + pixelH * 4}px`;
countdown.style.top = `${pixelH * 128}px`;

const waggleBtn = document.getElementById("waggle-btn");

//
//animation
const waggle = document.getElementById("waggle");
waggle.style.gap = `${pixelH * 16}px`;
const waggleMeImg = document.getElementById("waggle-me-img");

const waggleAnimationCtn = document.getElementById("waggle-animation-ctn");
waggleAnimationCtn.style.top = `${pixelH * 50}px`;
waggleAnimationCtn.style.left = `${(window.innerWidth - wwwidth) / 2}px`;
waggleAnimationCtn.style.height = `${pixelH * 70}px`;
waggleAnimationCtn.style.width = wwwidth + "px";
waggleAnimationCtn.style.gap = `${pixelH * 4}px`;

const heart = document.getElementById("heart-btn");
heart.style.left = `${(window.innerWidth - pixelW * 15) / 2}px`;
heart.style.top = `${pixelH * 130}px`;

const waggleTxt = document.getElementById("waggle-txt");
waggleTxt.style.margin = "auto";

const heartImg = document.getElementById("heart-btn-img");
heartImg.style.width = `${pixelW * 15}px`;
heartImg.style.height = `${pixelW * 15}px`;

waggleMeImg.style.width = pixelW * 26 * 2 + "px";
