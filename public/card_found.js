let card = document.createElement("div");
let imgCardSrc = "assets/images/cards/CARD_" + you.color + ".png";
card.classList.add("card", "flex-col");
card.style.backgroundImage = `url(${imgCardSrc})`;

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
dog.innerHTML = you.name;
dog.style.width = "100%";
dog.style.height = "fit-content";

//MODIFICA
let waggleNum = document.createElement("div");
waggleNum.classList.add("flex-row");

modImg.style.width = pixelW * 11 + "px";

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
let doggo = you.breed.toUpperCase();
dogImg.src = "assets/images/cani/" + doggo + ".png";
console.log(you.breed);
caneSize(you.breed);

dogImg.style.width = imgCane.width + "px";
dogImg.style.height = imgCane.height + "px";

// sesso del cane
let dogSesso = document.createElement("img");
dogSesso.src = "assets/elements/card/" + you.sesso + "_C" + ".png";
dogSesso.style.height = 8 * pixelH + "px";
dogSesso.style.marginRight = "auto";

dogImgCtn.appendChild(dogImg);
dogImgCtn.appendChild(dogSesso);
card.appendChild(dogImgCtn);

// DIV 2 - eta e razza e badge
let divEtaRazza = document.createElement("div");
divEtaRazza.classList.add("flex-col");
divEtaRazza.id = "div-eta-razza";

// DIV 2a - badge + eta
let divEtaBadge = document.createElement("div");
divEtaBadge.classList.add("flex-row");
divEtaBadge.style.justifyContent = "space-between";

// ETA CANE
let age = document.createElement("div");
age.classList.add("text");
age.innerHTML = "ETÀ: " + you.age;
age.style.fontFamily = "lores-9-narrow";
age.style.fontSize = 9 * pixelH + "px";

// BADGE
let badge = document.createElement("div");
badge.classList.add("flex-row");
badge.style.justifyContent = "space-between";
badge.style.width = 28 * pixelH + "px";
badge.style.padding = 1 * pixelH + "px";
badge.style.paddingTop = 0;
badge.style.paddingBottom = 0;

let badgeCuore = document.createElement("img");
badgeCuore.style.height = 8 * pixelH + "px";
badgeCuore.src = "assets/elements/card/HEART_FRAME.png";
badgeCuore.style.display = "block";
let badgeOsso = document.createElement("img");
badgeOsso.src = "assets/elements/card/BONE_FRAME.png";
badgeOsso.style.height = 8 * pixelH + "px";
badgeOsso.style.width = 13 * pixelH + "px";

badgeCuore.style.width = 9 * pixelH + "px";
badgeCuore.style.height = 8 * pixelH + "px";
badgeOsso.style.display = "block";
badge.appendChild(badgeOsso);
badge.appendChild(badgeCuore);

// RAZZA DEL CANE
let razza = document.createElement("div");
razza.classList.add("text");
razza.innerHTML = "RAZZA: </br>" + you.breed;
razza.style.fontFamily = "lores-9-narrow";
razza.style.fontSize = 9 * pixelH + "px";

divEtaBadge.appendChild(age);
divEtaBadge.appendChild(badge);
divEtaRazza.appendChild(divEtaBadge);
divEtaRazza.appendChild(razza);

card.appendChild(divEtaRazza);

// OWNER
let owner = document.createElement("div");
owner.classList.add("text");
owner.id = "owner";
owner.innerHTML = "@" + you.owner.toLowerCase();
owner.style.marginRight = "auto";
owner.style.height = pixelH * 13 + "px";
owner.style.lineHeight = pixelH * 13 + "px";
owner.style.fontSize = 9 * pixelH + "px";
card.appendChild(owner);

waggle.appendChild(card);

// BIO
let bio = document.createElement("div");
bio.classList.add("text", "flex-row", "hidden");

bio.innerHTML = "BIO: </br>" + you.bio;

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
    imgCardSrc = "assets/images/cards/CARD_RETRO_" + you.color + ".png";
    card.style.backgroundImage = `url(${imgCardSrc})`;
    front = false;
  } else if (front == false) {
    imgCardSrc = "assets/images/cards/CARD_" + you.color + ".png";
    card.style.backgroundImage = `url(${imgCardSrc})`;
    front = true;
  }
});
