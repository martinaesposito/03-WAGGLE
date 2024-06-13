// //////////////////////////////////////////////////////////////////////////

// KEY
let params = new URLSearchParams(document.location.search);
let name = params.get("key");

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

// //////////////////////////////////////////////////////////////////

///CTN
let ctn = document.getElementById("ctn");
ctn.style.height = hhheight + "px";
ctn.style.width = wwwidth + "px";
ctn.backgroundColor = "red";
// ctn.style.backgroundColor = "green";
// ctn.style.justifyContent = "space-between";

// IMAGE DOGGO
let dogImgCtn = document.getElementById("dog-ctn");
dogImgCtn.classList.add("flex-col", "img-ctn");

let dogImg = document.getElementById("doggo");
let doggo = userData.breed.toUpperCase();
dogImg.src = "assets/images/guardaroba/cani/" + doggo + "-GUARDAROBA.png";
console.log(userData.breed);
caneSize(userData.breed);

dogImg.style.width = imgCane.width + "px";
dogImg.style.height = imgCane.height + "px";

//GUARDAROBA OPT
// CTN
let guardCtn = document.getElementById("guardaroba-ctn");
guardCtn.style.position = "absolute";
guardCtn.style.top = pixelH * 71 + "px";

let optCtn = document.getElementById("guardaroba-opt");

optCtn.style.width = wwwidth + "px";
optCtn.classList.add("flex-row");
optCtn.style.height = pixelH * 18 + "px";
optCtn.style.alignItems = "center";
optCtn.style.justifyContent = "space-between";

// OPT
let guardOpt = document.getElementsByClassName("guardaroba-opt");
console.log(guardOpt);

let s = 11;

let unclicked = true;
guardOpt.forEach((element, i) => {
  element.style.display = "block";
  element.style.width = pixelW * 18 + "px";

  if (i < 3) {
    element.addEventListener("click", () => {
      guardOpt.forEach((e) => {
        e.classList.remove("btn-active"); //toglie la classe a tutti
        e.src = "assets/elements/guardaroba/" + e.id.toUpperCase() + ".png";
      });

      s = element.id;

      console.log(element.id);
      element.src =
        "assets/elements/guardaroba/" + element.id.toUpperCase() + "_PRESS.png";
      createElementGuard(element.id); //in base al coso che clicco crea tot elementi con la classe della categoria selezionata
    });
  }
  //   element.style.height = "auto";
});

console.log(s);
//guardaroba elements ctn ctn
let guardElemCtn = document.getElementById("guardaroba-elements-ctn");
console.log(guardElemCtn);
guardElemCtn.classList.add("border");

guardElemCtn.style.height = 60 * pixelH + "px";
guardElemCtn.style.width = "100%";

let element; //ciascun div del mo guardaroba
let elements = [];

for (let i = 0; i <= s; i++) {
  console.log(i);
  element = document.createElement("div"); //creo 9 div per guardaroba
  element.classList.add("guardaroba-elements");
  element.style.height = 24 * pixelW + "px";

  //   element.style.width = pixelW * 20 + "px";
  guardElemCtn.appendChild(element);
  elements.push(element);
}

////////
// creo le immagini degli accessori
let images = [];
function createElementGuard(id) {
  console.log(id);
  images.forEach((e) => {
    e.remove();
  });

  elements.forEach((a) => a.classList.remove("border"));

  if (id == "vestito" || id == "oggetto") {
    s = 8;
  } else if (id == "accessorio") {
    s = 9;
  }

  for (let i = 0; i <= s; i++) {
    let img = document.createElement("img");
    img.src =
      "assets/images/guardaroba/icone/" + id.toUpperCase() + "-" + i + ".png";
    img.style.width = 24 * pixelW + "px";
    img.style.height = 24 * pixelH + "px";
    elements[i].id = id + "-" + i;
    console.log(id);
    console.log(elements[i]);
    elements[i].id = id;
    elements[i].appendChild(img);
    images.push(img);
  }
  console.log(elements);
  applyGuard();
}

//applico gli accessori al cane
let imgVestitoCtn;
let imgAccessorioCtn;
let imgGadgetCtn;
let imgGuardCtns = [];
let imgGuard;
let imgGuards = { vestito: null, accessorio: null, oggetto: null };
let targetContainer, targetType;

function applyGuard() {
  // Create the div containers
  imgVestitoCtn = document.createElement("div");
  imgAccessorioCtn = document.createElement("div");
  imgGadgetCtn = document.createElement("div");
  imgGuardCtns.push(imgVestitoCtn, imgAccessorioCtn, imgGadgetCtn);

  imgGuardCtns.forEach((container, index) => {
    container.classList.add("flex-col", "img-ctn");
    container.style.zIndex = 5 + index;
    ctn.appendChild(container);
  });

  elements.forEach((element, x) => {
    element.addEventListener("click", () => {
      console.log(element);
      if (element.id == "vestito") {
        targetContainer = imgVestitoCtn;
        targetType = "vestito";
      }
      if (element.id == "accessorio") {
        targetContainer = imgAccessorioCtn;
        targetType = "accessorio";
      }
      if (element.id == "oggetto") {
        targetContainer = imgGadgetCtn;
        targetType = "oggetto";
      }
      console.log(targetType);

      if (targetContainer) {
        if (imgGuards[targetType]) {
          imgGuards[targetType].remove();
          console.log(imgGuards);
        }

        elements.forEach((el) => el.classList.remove("border"));
        element.classList.add("border");

        imgGuard = document.createElement("img");
        imgGuard.src =
          "assets/images/guardaroba/" +
          doggo +
          "-" +
          element.id.toUpperCase() +
          "-" +
          x +
          ".png";
        imgGuard.style.width = imgCane.width + "px";
        imgGuard.style.height = imgCane.height + "px";
        imgGuard.style.position = "relative";
        imgGuard.style.marginTop = "auto";

        targetContainer.appendChild(imgGuard);
        imgGuards[targetType] = imgGuard;

        console.log(imgGuards);
      }
    });
  });
}

//////////////////////////////////////////////////////////////////////////

//BACK
let back = document.getElementById("back");
back.addEventListener("click", function () {
  window.open("match.html" + "?key=" + name, "_self");
});

// //////////////////////////////////////////////////////////////////////////

function caneSize(cane) {
  //  "BASSOTTO", "COCKER","LEVRIERO", "DALMATA","ESKIMO", "Barboncino", "Golden", "Labrador", "Cavalier King",

  if (cane == razze[0]) {
    //"BASSOTTO"
    imgCane = { width: pixelW * 58, height: pixelH * 30 };
  } else if (cane == razze[1]) {
    //"COCKER"
    imgCane = { width: pixelW * 59, height: pixelH * 38 };
  } else if (cane == razze[2]) {
    //"LEVRIERO"
    imgCane = { width: pixelW * 58, height: pixelH * 45 };
  } else if (cane == razze[3]) {
    //"DALMATA"
    imgCane = { width: pixelW * 58, height: pixelH * 48 };
  } else if (cane == razze[4]) {
    //"ESKIMO"
    imgCane = { width: pixelW * 52, height: pixelH * 43 };
  } else if (cane == razze[5]) {
    //"Barboncino"
    imgCane = { width: pixelW * 46, height: pixelH * 39 };
  } else if (cane == razze[6]) {
    //"Golden"
    imgCane = { width: pixelW * 56, height: pixelH * 46 };
  } else if (cane == razze[7]) {
    //Labrador
    imgCane = { width: pixelW * 54, height: pixelH * 46 };
  } else if (cane == razze[8]) {
    //"Cavalier King"
    imgCane = { width: pixelW * 58, height: pixelH * 48 };
  }
  return imgCane;
  // }
}
