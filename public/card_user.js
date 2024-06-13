///CTN
let ctn = document.getElementById("ctn");
ctn.style.height = hhheight + "px";
ctn.style.width = wwwidth + "px";
// ctn.style.backgroundColor = "green";
ctn.style.justifyContent = "space-between";

// KEY
let params = new URLSearchParams(document.location.search);
let name = params.get("key");
let user = params.get("user");

const storedUserData = sessionStorage.getItem(name); // Use sessionStorage
const storedOtherUserData = sessionStorage.getItem(user); // Use sessionStorage
const userData = storedUserData ? JSON.parse(storedOtherUserData) : null;

console.log(userData);

let razze = [
  //Array di array per le razze di cani
  { razza: "Bassotto", width: pixelW * 22 * 2, height: pixelH * 2 * 12 },
  { razza: "Barboncino", width: pixelW * 17 * 2, height: pixelH * 2 * 17 },
  { razza: "Cavalier King", width: pixelW * 21 * 2, height: pixelH * 2 * 17 },
  {
    razza: "Yorkshire Terrier",
    width: pixelW * 17 * 2,
    height: pixelH * 2 * 13,
  },
  { razza: "Papillon", width: pixelW * 17 * 2, height: pixelH * 2 * 13 },
  { razza: "Chihuahua", width: pixelW * 13 * 2, height: pixelH * 2 * 11 },
  { razza: "Carlino", width: pixelW * 16 * 2, height: pixelH * 2 * 14 },
  { razza: "Beagle", width: pixelW * 21 * 2, height: pixelH * 2 * 15 },
  { razza: "Cocker", width: pixelW * 23 * 2, height: pixelH * 2 * 16 },
  { razza: "Chin", width: pixelW * 20 * 2, height: pixelH * 2 * 18 },
  { razza: "Dalmata", width: pixelW * 25 * 2, height: pixelH * 2 * 21 },
  { razza: "Levriero", width: pixelW * 24 * 2, height: pixelH * 2 * 20 },
  { razza: "Labrador", width: pixelW * 24 * 2, height: pixelH * 2 * 20 },
  { razza: "Golden", width: pixelW * 22 * 2, height: pixelH * 2 * 20 },
  { razza: "Eskimo", width: pixelW * 20 * 2, height: pixelH * 2 * 19 },
  { razza: "Weimarainer", width: pixelW * 21 * 2, height: pixelH * 2 * 20 },
];
// CAAAAARDDDDDD
let cardCtn = document.getElementById("card-ctn");

let card = document.createElement("div");
let imgCardSrc;

if (userData.num == 50) {
  imgCardSrc =
    "assets/images/cards_gallery_big/CARD_" + userData.color + ".gif";
} else if (26 <= userData.num && userData.num < 50) {
  imgCardSrc =
    "assets/images/cards_gallery_big/CARD_25W_" + userData.color + ".png";
} else
  imgCardSrc =
    "assets/images/cards_gallery_big/CARD_" + userData.color + ".png";

console.log(imgCardSrc);
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
// card.style.gap = 1.8 * pixelH + "px";

/// //////////////////////////////////////////////////////////////////////////
// INFO
pixelH = (wwwidth * 1.625) / 130;
/////////////////FRONTE

// DIV 1 - dog e modifica
let divDogMod = document.createElement("div");

divDogMod.classList.add("flex-row");
divDogMod.style.width = "100%";
divDogMod.style.height = 13 * pixelH + "px";
divDogMod.style.alignItems = "center";

// DOG
let dog = document.createElement("div");
dog.classList.add("text");
dog.style.fontSize = 12 * pixelH + "px";
dog.style.fontFamily = "lores-12-narrow";
dog.innerHTML = userData.name;
dog.style.width = "100%";
dog.style.height = "fit-content";

//NUMERO WAGGLE IN ALTO
let waggleNum = document.createElement("div");
waggleNum.classList.add("flex-row");
waggleNum.style.gap = 2 * pixelW + "px";
waggleNum.style.justifyContent = "flex-end";
waggleNum.style.alignItems = "center";

let waggleHeart = document.createElement("img");
waggleHeart.src = "assets/elements/card/CUORICINO_WAGGLE.png";
waggleHeart.style.height = 6 * pixelH + "px";
waggleHeart.style.width = 7 * pixelW + "px";

let waggleNumHigh = document.createElement("div");
waggleNumHigh.classList.add("text");
waggleNumHigh.innerHTML = userData.num;

waggleNum.appendChild(waggleHeart);
waggleNum.appendChild(waggleNumHigh);

divDogMod.appendChild(dog);
divDogMod.appendChild(waggleNum);
card.appendChild(divDogMod);

// IMMAGINE CANE
let dogImgCtn = document.createElement("Div");
dogImgCtn.style.height = 64 * pixelH + "px";
dogImgCtn.style.width = "100%";
dogImgCtn.classList.add("flex-col");
dogImgCtn.style.alignItems = "center";
dogImgCtn.style.justifyContent = "space-between";
dogImgCtn.style.flexDirection = "column-reverse";
dogImgCtn.style.paddingTop = 4 * pixelH + "px";
dogImgCtn.style.paddingBottom = 8 * pixelH + "px";

let dogImg = document.createElement("img");
let doggo = userData.breed.razza;
dogImg.src = "assets/images/cani/" + doggo.toUpperCase() + ".png";
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
divEtaRazza.classList.add("flex-col");

divEtaRazza.style.width = "100%";
divEtaRazza.style.minHeight = 34 * pixelH + "px";

divEtaRazza.style.alignItems = "left";
divEtaRazza.style.justifyContent = "space-evenly";

// DIV 2a - badge + eta
let divEtaBadge = document.createElement("div");
divEtaBadge.classList.add("flex-row");

divEtaBadge.style.justifyContent = "space-between";

// ETA CANE
let age = document.createElement("div");
age.classList.add("text");
age.style.justifyContent = "center";
age.innerHTML = "ETÀ: " + userData.age;
age.style.whiteSpace = "nowrap";
age.style.fontFamily = "lores-9-narrow";

// BADGE
let badge = document.createElement("div");
badge.classList.add("flex-row");
badge.style.justifyContent = "space-between";
badge.style.width = 28 * pixelH + "px";
badge.style.padding = "0 " + 1 * pixelH + "px";

let badgeCuore = document.createElement("img");
badgeCuore.style.height = 8 * pixelH + "px";

function rdmHNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
badgeCuore.src =
  "assets/elements/card/badge/HEART_FRAME_" + rdmHNum(0, 5) + ".png";
badgeCuore.style.display = "block";
let badgeOsso = document.createElement("img");
badgeOsso.src =
  "assets/elements/card/badge/OSSO_FRAME_" + rdmHNum(0, 5) + ".png";
badgeOsso.style.height = 8 * pixelH + "px";
badgeOsso.style.width = 13 * pixelH + "px";

badgeCuore.style.width = 9 * pixelH + "px";
badgeCuore.style.height = 8 * pixelH + "px";
badgeOsso.style.display = "block";
console.log(badgeOsso, badgeCuore);
badge.appendChild(badgeOsso);
badge.appendChild(badgeCuore);

// RAZZA DEL CANE
let razza = document.createElement("div");
razza.classList.add("text");
razza.innerHTML = "RAZZA: </br>" + userData.breed.razza;
razza.style.fontFamily = "lores-9-narrow";

divEtaBadge.appendChild(age);
divEtaBadge.appendChild(badge);
divEtaRazza.appendChild(divEtaBadge);
divEtaRazza.appendChild(razza);

card.appendChild(divEtaRazza);

// OWNER
let owner = document.createElement("div");
owner.classList.add("text");
owner.innerHTML = "@" + userData.owner;
owner.style.marginRight = "auto";
owner.style.height = pixelH * 13 + "px";
owner.style.lineHeight = pixelH * 13 + "px";
card.appendChild(owner);

cardCtn.appendChild(card);

// BIO
let bio = document.createElement("div");
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
    if (userData.num == 50) {
      imgCardSrc =
        "assets/images/cards_gallery_big/CARD_RETRO_" + userData.color + ".gif";
    } else if (26 <= userData.num && userData.num < 50) {
      imgCardSrc =
        "assets/images/cards_gallery_big/CARD_RETRO_25W_" +
        userData.color +
        ".png";
    } else
      imgCardSrc =
        "assets/images/cards_gallery_big/CARD_RETRO_" + userData.color + ".png";

    card.style.backgroundImage = `url(${imgCardSrc})`;
    front = false;
  } else if (front == false) {
    if (userData.num == 50) {
      imgCardSrc =
        "assets/images/cards_gallery_big/CARD_" + userData.color + ".gif";
    } else if (26 <= userData.num && userData.num < 50) {
      imgCardSrc =
        "assets/images/cards_gallery_big/CARD_25W_" + userData.color + ".png";
    } else
      imgCardSrc =
        "assets/images/cards_gallery_big/CARD_" + userData.color + ".png";

    card.style.backgroundImage = `url(${imgCardSrc})`;
    front = true;
  }
});

// //////////////////////////////////////////////////////////////////////////

//BACK
let back = document.getElementById("back");
back.addEventListener("click", function () {
  window.open("gallery.html" + "?key=" + name, "_self");
});

function caneSize(cane) {
  razze.forEach((e, i) => {
    if (cane.razza.toUpperCase() == e.razza.toUpperCase()) {
      return (imgCane = { width: razze[i].width, height: razze[i].height });
      // }
    }
  });
}
