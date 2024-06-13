function cardCreate(you) {
  let card = document.createElement("div");
  let imgCardSrc;

  you.num = Math.floor(Math.random() * (50 - 1 + 1)) + 1;

  if (you.num == 50) {
    // color + space
    you.color = "50W_" + you.color;
    estensione = ".gif";
  } else if (25 <= you.num && you.num < 50) {
    // hearts + color
    you.color = you.color;
    estensione = ".png";
  } else if (15 <= you.num && you.num < 25) {
    // golden
    you.color = "15W";
    estensione = ".png";
  } else if (10 <= you.num && you.num < 15) {
    // silver
    you.color = "10W";
    estensione = ".png";
  } else if (5 <= you.num && you.num < 10) {
    // bronze
    you.color = "5W";
    estensione = ".png";
  } else if (2 <= you.num && you.num < 5) {
    // blue
    you.color = "2W";
    estensione = ".png";
  } else if (you.num == 1) {
    // base
    you.color = "BASE";
    estensione = ".png";
  }

  if (you.num == 50) {
    imgCardSrc = "assets/images/cards_gallery_big/CARD_" + you.color + ".gif";
  } else if (26 <= you.num && you.num < 50) {
    imgCardSrc =
      "assets/images/cards_gallery_big/CARD_25W_" + you.color + ".png";
  } else
    imgCardSrc = "assets/images/cards_gallery_big/CARD_" + you.color + ".png";

  console.log(imgCardSrc);
  // Set the background image
  card.style.backgroundImage = `url(${imgCardSrc})`;
  card.style.backgroundSize = "cover"; // Optional: to ensure the background image covers the card
  card.style.width = wwwidth + "px";
  card.style.height = wwwidth * 1.625 + "px";

  card.style.position = "absolute";

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
  waggleNumHigh.innerHTML = you.num;

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

  divEtaRazza.style.width = "100%";

  divEtaRazza.style.alignItems = "left";
  divEtaRazza.style.justifyContent = "space-evenly";

  // DIV 2a - badge + eta
  let divEtaBadge = document.createElement("div");
  divEtaBadge.classList.add("flex-row");

  divEtaBadge.style.justifyContent = "space-between";

  // ETA CANE
  let age = document.createElement("div");
  age.classList.add("text");
  age.innerHTML = "ETÀ: " + you.age;
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
  razza.innerHTML = "RAZZA: </br>" + you.breed;
  razza.style.fontFamily = "lores-9-narrow";

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
      if (you.num == 50) {
        imgCardSrc =
          "assets/images/cards_gallery_big/CARD_RETRO_" + you.color + ".gif";
      } else if (26 <= you.num && you.num < 50) {
        imgCardSrc =
          "assets/images/cards_gallery_big/CARD_RETRO_25W_" +
          you.color +
          ".png";
      } else
        imgCardSrc =
          "assets/images/cards_gallery_big/CARD_RETRO_" + you.color + ".png";

      card.style.backgroundImage = `url(${imgCardSrc})`;
      front = false;
    } else if (front == false) {
      if (you.num == 50) {
        imgCardSrc =
          "assets/images/cards_gallery_big/CARD_" + you.color + ".gif";
      } else if (26 <= you.num && you.num < 50) {
        imgCardSrc =
          "assets/images/cards_gallery_big/CARD_25W_" + you.color + ".png";
      } else
        imgCardSrc =
          "assets/images/cards_gallery_big/CARD_" + you.color + ".png";

      card.style.backgroundImage = `url(${imgCardSrc})`;
      front = true;
    }
  });
}
