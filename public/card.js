///CTN
let ctn = document.getElementById("ctn");
ctn.style.height = hhheight + "px";
ctn.style.width = wwwidth + "px";
// ctn.style.backgroundColor = "green";
ctn.style.justifyContent = "space-between";

// KEY
let params = new URLSearchParams(document.location.search);
let name = params.get("key");
let page = params.get("page");

const storedUserData = sessionStorage.getItem(name); // Use sessionStorage
const userData = storedUserData ? JSON.parse(storedUserData) : null;

console.log(userData);

let razze = [
  //Array di array per le razze di cani
  "Bassotto",
  "Cocker",
  "Levriero",
  "Dalmata",
  "Eskimo",
  "Barboncino",
  "Golden",
  "Labrador",
  "Cavalier King",
];

// CAAAAARDDDDDD
let cardCtn = document.getElementById("card-ctn");

let card = document.createElement("div");
let imgCardSrc = "assets/images/cards/CARD_" + userData.color + ".png";

// Set the background image
card.style.backgroundImage = `url(${imgCardSrc})`;
card.style.backgroundSize = "cover"; // Optional: to ensure the background image covers the card
card.style.width = wwwidth + "px";
card.style.height = wwwidth * 1.6375 + "px";

card.style.imageRendering = "pixelated";

card.classList.add("flex-col");
card.style.justifyContent = "space-between";
cardCtn.style.margin = "auto";
card.style.alignItems = "center";

card.style.padding = 1.8 * pixelH + "px";
card.style.paddingLeft = 4 * pixelW + "px";
card.style.paddingRight = 0;
// card.style.gap = 1.8 * pixelH + "px";

/// //////////////////////////////////////////////////////////////////////////
// INFO
pixelH = (wwwidth * 1.625) / 130;
/////////////////FRONTE

// DIV 1 - dog e modifica
let divDogMod = document.createElement("div");

divDogMod.classList.add("flex-row");
divDogMod.style.width = "100%";
divDogMod.style.height = 12.5 * pixelH + "px";
divDogMod.style.alignItems = "center";

// DOG
let dog = document.createElement("div");
dog.classList.add("text");
dog.style.fontSize = 12 * pixelH + "px";
dog.style.fontFamily = "lores-12-narrow";
dog.innerHTML = userData.name;
dog.style.width = "100%";
dog.style.height = "fit-content";

//MODIFICA
let modifica = document.getElementById("modifica");
modifica.style.marginTop = "auto";
let modImg = document.getElementById("mod-png");
modifica.style.marginRight = pixelW * 4 + "px";
modImg.style.width = pixelW * 11 + "px";
modifica.style.height = 12.5 * pixelH + "px";

modifica.addEventListener("click", function () {
  window.open("form.html" + "?key=" + name, "_self");
});

divDogMod.appendChild(dog);
divDogMod.appendChild(modifica);
card.appendChild(divDogMod);

// IMMAGINE CANE
let dogImgCtn = document.createElement("Div");
dogImgCtn.style.height = 62 * pixelH + "px";
dogImgCtn.style.width = "100%";
dogImgCtn.classList.add("flex-col");
dogImgCtn.style.alignItems = "center";
dogImgCtn.style.justifyContent = "space-between";
dogImgCtn.style.flexDirection = "column-reverse";
dogImgCtn.style.paddingTop = 4 * pixelH + "px";
dogImgCtn.style.paddingBottom = 8 * pixelH + "px";

let dogImg = document.createElement("img");
let doggo = userData.breed.toUpperCase();
dogImg.src = "assets/images/cani/" + doggo + ".png";
console.log(userData.breed);
caneSize(userData.breed);

dogImg.style.width = imgCane.width + "px";
dogImg.style.height = imgCane.height + "px";

// sesso del cane
let dogSesso = document.createElement("img");
dogSesso.src = "assets/elements/card/" + userData.sesso + "_C" + ".png";
dogSesso.style.height = 8 * pixelH + "px";
dogSesso.style.marginRight = "auto";

dogImgCtn.appendChild(dogImg);
dogImgCtn.appendChild(dogSesso);
card.appendChild(dogImgCtn);

// DIV 2 - eta e razza e badge
let divEtaRazza = document.createElement("div");
divEtaRazza.id = "divEtaRazza";
divEtaRazza.classList.add("flex-col");

divEtaRazza.style.width = "100%";

divEtaRazza.style.alignItems = "left";
divEtaRazza.style.justifyContent = "space-evenly";

// DIV 2a - badge + eta
let divEtaBadge = document.createElement("div");
divEtaBadge.classList.add("flex-row");
divEtaBadge.style.justifyContent = "space-between";

// ETA CANE
let age = document.createElement("div");
age.classList.add("text", "flex-col");
age.style.justifyContent = "center";
age.style.whiteSpace = "nowrap";
// age.style.paddingBottom = 2 * pixelH + "px";
// age.style.marginRight = "auto";
age.innerHTML = "ETÀ: " + userData.age;
age.style.fontFamily = "lores-9-narrow";

// BADGE
let badge = document.createElement("div");
badge.classList.add("flex-row");
badge.style.backgroundImage = `url(${
  "assets/images/cards/badge_box/BadgeBox_" + userData.color + ".png"
})`;
badge.style.backgroundSize = "cover";
badge.style.justifyContent = "space-between";
badge.style.alignItems = "center";
badge.style.width = 33 * pixelW + "px";
badge.style.height = 17 * pixelH + "px";
badge.style.padding = 4 * pixelH + "px";

let badgeCuore = document.createElement("img");
badgeCuore.style.height = 8 * pixelH + "px";
badgeCuore.src = "assets/elements/card/HEART_FRAME.png";

let badgeOsso = document.createElement("img");
badgeOsso.src = "assets/elements/card/BONE_FRAME.png";
badgeOsso.style.height = 8 * pixelH + "px";
badgeOsso.style.width = 13 * pixelH + "px";

badgeCuore.style.width = 9 * pixelH + "px";
badgeCuore.style.height = 8 * pixelH + "px";

badge.appendChild(badgeOsso);
badge.appendChild(badgeCuore);

// RAZZA DEL CANE
let razza = document.createElement("div");
razza.classList.add("text");
razza.innerHTML = "RAZZA: </br>" + userData.breed;
razza.style.fontFamily = "lores-9-narrow";

divEtaBadge.appendChild(age);
divEtaBadge.appendChild(badge);
divEtaRazza.appendChild(divEtaBadge);
divEtaRazza.appendChild(razza);

card.appendChild(divEtaRazza);

// OWNER
let owner = document.createElement("div");
owner.classList.add("text");
owner.innerHTML = "@" + userData.owner.toLowerCase();
owner.style.marginRight = "auto";
owner.style.height = pixelH * 13 + "px";
owner.style.lineHeight = pixelH * 13 + "px";

card.appendChild(owner);

cardCtn.appendChild(card);

// BIO
let bio = document.createElement("div");
bio.id = "bio";
bio.classList.add("text");
bio.classList.add("flex-row");
bio.classList.add("hidden");

bio.innerHTML = "BIO: </br>" + userData.bio;

divEtaRazza.appendChild(bio);

/////////////////RETRO
let front = true;

card.addEventListener("click", function () {
  //
  dogImgCtn.classList.toggle("hidden");
  divEtaBadge.classList.toggle("hidden");
  razza.classList.toggle("hidden");

  bio.classList.toggle("hidden");

  if (front == true) {
    imgCardSrc = "assets/images/cards/CARD_RETRO_" + userData.color + ".png";
    card.style.backgroundImage = `url(${imgCardSrc})`;
    front = false;
  } else if (front == false) {
    imgCardSrc = "assets/images/cards/CARD_" + userData.color + ".png";
    card.style.backgroundImage = `url(${imgCardSrc})`;
    front = true;
  }
});

// //////////////////////////////////////////////////////////////////////////

// OK vs BACK
let ok = document.getElementById("ok");
let back = document.getElementById("back");

if (page == "form") {
  ok.classList.remove("hidden");
  back.classList.add("hidden");
} else if (page == "map") {
  ok.classList.add("hidden");
  back.classList.remove("hidden");
}

//BACK
back.addEventListener("click", function () {
  window.open("match.html" + "?key=" + name, "_self");
});

//OK
ok.addEventListener("click", function () {
  window.open("match.html" + "?key=" + name, "_self");
});

function caneSize(cane) {
  //  "BASSOTTO", "COCKER","LEVRIERO", "DALMATA","ESKIMO", "Barboncino", "Golden", "Labrador", "Cavalier King",

  if (cane == razze[0]) {
    //"BASSOTTO"
    imgCane = { width: pixelW * 22 * 2, height: pixelH * 2 * 12 };
  } else if (cane == razze[1]) {
    //"COCKER"
    imgCane = { width: pixelW * 22 * 2, height: pixelH * 2 * 16 };
  } else if (cane == razze[2]) {
    //"LEVRIERO"
    imgCane = { width: pixelW * 24 * 2, height: pixelH * 2 * 20 };
  } else if (cane == razze[3]) {
    //"DALMATA"
    imgCane = { width: pixelW * 25 * 2, height: pixelH * 2 * 21 };
  } else if (cane == razze[4]) {
    //"ESKIMO"
    imgCane = { width: pixelW * 19 * 2, height: pixelH * 2 * 20 };
  } else if (cane == razze[5]) {
    //"Barboncino"
    imgCane = { width: pixelW * 17 * 2, height: pixelH * 2 * 17 };
  } else if (cane == razze[6]) {
    //"Golden"
    imgCane = { width: pixelW * 22 * 2, height: pixelH * 2 * 20 };
  } else if (cane == razze[7]) {
    //Labrador
    imgCane = { width: pixelW * 24 * 2, height: pixelH * 2 * 20 };
  } else if (cane == razze[8]) {
    //"Cavalier King"
    imgCane = { width: pixelW * 21 * 2, height: pixelH * 2 * 17 };
  }
  return imgCane;
  // }
}
