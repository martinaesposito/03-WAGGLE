// //////////////////////////////////////////////////////////////////////////

// KEY
let params = new URLSearchParams(document.location.search);
let name = params.get("key");

const storedUserData = sessionStorage.getItem(name); // Use sessionStorage
const userData = storedUserData ? JSON.parse(storedUserData) : null;

console.log(userData);

// waggle number

////////////////////////////////////////////////////////////////

///CTN
let ctn = document.getElementById("ctn");
ctn.style.height = hhheight + "px";
ctn.style.width = wwwidth + "px";
// ctn.style.backgroundColor = "green";
ctn.style.justifyContent = "space-between";

//Waggle ctn
let waggleCtn = document.getElementById("waggles-ctn");
console.log(waggleCtn);
waggleCtn.style.height = 131 * pixelH + "px";
waggleCtn.style.width = "100%";
waggleCtn.style.backgroundImage = "url(assets/elements/gallery-bg.png)";
waggleCtn.style.backgroundSize = "cover";

////////////
let imgCane;
let razze = [
  //Array di array per le razze di cani
  { razza: "Bassotto", width: pixelW * 22, height: pixelH * 12 },
  { razza: "Barboncino", width: pixelW * 17, height: pixelH * 17 },
  { razza: "Cavalier King", width: pixelW * 21, height: pixelH * 17 },
  {
    razza: "Yorkshire Terrier",
    width: pixelW * 17,
    height: pixelH * 13,
  },
  { razza: "Papillon", width: pixelW * 17, height: pixelH * 13 },
  { razza: "Chihuahua", width: pixelW * 13, height: pixelH * 11 },
  { razza: "Carlino", width: pixelW * 16, height: pixelH * 14 },
  { razza: "Beagle", width: pixelW * 21, height: pixelH * 15 },
  { razza: "Cocker", width: pixelW * 23, height: pixelH * 16 },
  { razza: "Chin", width: pixelW * 20, height: pixelH * 18 },
  { razza: "Dalmata", width: pixelW * 25, height: pixelH * 21 },
  { razza: "Levriero", width: pixelW * 24, height: pixelH * 20 },
  { razza: "Labrador", width: pixelW * 24, height: pixelH * 20 },
  { razza: "Golden", width: pixelW * 22, height: pixelH * 20 },
  { razza: "Eskimo", width: pixelW * 20, height: pixelH * 19 },
  { razza: "Weimarainer", width: pixelW * 21, height: pixelH * 20 },
];

//Arrays of possible values for names, breeds, and colors
const dogNames = [
  "Buddy",
  "Bella",
  "Charlie",
  "Luna",
  "Max",
  "Lucy",
  "Bailey",
  "Daisy",
  "Rocky",
  "Molly",
  "Toby",
  "Sadie",
  "Cody",
  "Maggie",
  "Riley",
  "Stella",
  "Oscar",
  "Zoey",
  "Jake",
  "Ruby",
];
const ownerNames = [
  "Aliciotta",
  "B000b",
  "o871o",
  "Davidone",
  "Evelyn01",
  "Frank55",
  "Graziella",
  "4niz",
  "Ivana_03",
  "Gin.nica",
  "kaleidoscop3",
  "Leo_ilKing",
  "Brad89",
  "Andr3a",
  "Petrollla",
  "Ani04",
  "PietroIlBello",
  "Marti:)",
  "Oblio",
  "marcuz9",
];
let age = [
  "<6 m.",
  ">6m.",
  "1a.",
  "2a",
  "3a",
  "4a",
  "5a",
  "6a",
  "7a",
  "8a",
  "9a",
  "10a",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18a",
  "19a",
  "20a",
  "21a",
  "22a",
];
const breeds = [
  { razza: "Bassotto", width: pixelW * 22 * 2, height: pixelH * 2 * 12 },
  { razza: "Barboncino", width: pixelW * 17 * 2, height: pixelH * 2 * 17 },
  { razza: "Cavalier King", width: pixelW * 21 * 2, height: pixelH * 2 * 17 },
  {
    razza: "Yorkshire Terrier",
    width: pixelW * 24 * 2,
    height: pixelH * 2 * 20,
  },
  { razza: "Papillon", width: pixelW * 22 * 2, height: pixelH * 2 * 20 },
  { razza: "Chihuahua", width: pixelW * 22 * 2, height: pixelH * 2 * 20 },
  { razza: "Carlino", width: pixelW * 19 * 2, height: pixelH * 2 * 20 },
  { razza: "Beagle", width: pixelW * 19 * 2, height: pixelH * 2 * 20 },
  { razza: "Cocker", width: pixelW * 22 * 2, height: pixelH * 2 * 16 },
  { razza: "Chin", width: pixelW * 25 * 2, height: pixelH * 2 * 21 },
  { razza: "Dalmata", width: pixelW * 25 * 2, height: pixelH * 2 * 21 },
  { razza: "Levriero", width: pixelW * 24 * 2, height: pixelH * 2 * 20 },
  { razza: "Labrador", width: pixelW * 24 * 2, height: pixelH * 2 * 20 },
  { razza: "Golden", width: pixelW * 22 * 2, height: pixelH * 2 * 20 },
  { razza: "Eskimo", width: pixelW * 19 * 2, height: pixelH * 2 * 20 },
  { razza: "Weimarainer", width: pixelW * 19 * 2, height: pixelH * 2 * 20 },
];
let cooolors = ["95C623", "B897FF", "F75247", "FF8D23", "FF9BEF"];
const bios = [
  "Uno scodinzolone! Ha un'energia contagiosa e positiva.",
  "Amichevole e affettuoso, carino e coccoloso",
  "Un vero croccantini lover <3 </br> Qualche biscottino e sarà il vostro migliore amico.",
  "Un corridore nato! Il più veloce di tutto Parco Sempione",
  "Adora i grattini sulla pancia, come i gatti. Una volta l'ho sentito miagolare.",
  "Sarebbe super coccoloso se solo non puzzasse tantissimo :(",
  "Ha un cuore grande e affettuoso <3 </br> Il suo cibo preferito sono gli abbracci della mulino bianco",
  "Adora giocare con la palla nel parco.",
  "Un vero esploratoreeee  </br>  Sempre curioso di esplorare nuovi posti.",
  "Molto socievole con tutti, grandi e piccini :)",
  "Ama stare all'aperto e respirare l'aria fresca.",
  "Cane pazzo, pazzo cane, cane pazzo, pazzo cane, cane pazzo, pazzo cane,...",
  "È sempre alla ricerca di nuove avventure.",
  "Incredibilmente intelligente e noioso. Discutiamo spesso su chi sia meglio tra Hegel e Kant",
  "Sempre pronto per le coccole! Porta felicità a chiunque incontri.",
  "Un vero latin lover <3 Ha rubato il cuore a tutti i cani di Parco Sempione",
  "Adora svolazzare in giro per la sua gabbietta.",
  "Un egocentrico cucciolo, sempre in cerca di attenzioni e coccole!",
  "Ha un nasone che ficca dappertutto! Curioso e sempre in cerca di avventure.",
  "Il suo abbaio è un sorriso che illumina la giornata di chiunque.",
];

let sesso = ["M", "F"];

let num;
let numCtn = [];

let arrayEta = [
  "<6m.",
  ">6m.",
  "1a.",
  "2a.",
  "3a.",
  "4a.",
  "5a.",
  "6a.",
  "7a.",
  "8a.",
  "9a.",
  "10a.",
  "11a.",
  "12a.",
  "13a.",
  "14a.",
  "15a.",
  "16a.",
  "17a.",
  "18a.",
  "19a.",
  "20a.",
  ">20a.",
];

// Function to generate a random integer between min (inclusive) and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to get a random element from an array
function getRandomElement(arr) {
  return arr[getRandomInt(0, arr.length - 1)];
}

// Generate an array of 20 dog objects
let altriCaniArray = [];
for (let i = 0; i <= 20; i++) {
  if (i == 20) {
    num = 1;
  } else if (11 <= i && i <= 19) {
    num = getRandomInt(1, 2);
  } else if (5 <= i && i <= 10) {
    num = getRandomInt(5, 15);
  } else if (2 <= i && i <= 4) {
    // i primi 5 hanno valori compresi tra 1 e 2
    num = getRandomInt(16, 50);
  } else num = 50;

  let dog = {
    owner: getRandomElement(ownerNames),
    name: getRandomElement(dogNames),
    age: getRandomElement(arrayEta),
    bio: getRandomElement(bios),
    sesso: getRandomElement(sesso),
    size: "", // You can add logic for size if needed
    breed: getRandomElement(breeds), //breed is optional
    color: getRandomElement(cooolors),

    num: num,
  };
  altriCaniArray.push(dog);
  numCtn.push(dog.num);
}

// //////////////////////////////////////////////////////////////////

// CARDS CREATE
let cards = [];
altriCaniArray.forEach((e) => {
  let card = document.createElement("div");
  let estensione;

  // differenzio gli sfondi in base al livello di amicizia
  if (e.num == 50) {
    // color + space
    e.color = "50W_" + e.color;
    estensione = ".gif";
  } else if (25 <= e.num && e.num < 50) {
    // hearts + color
    e.color = e.color;
    estensione = ".png";
  } else if (15 <= e.num && e.num < 25) {
    // golden
    e.color = "15W";
    estensione = ".png";
  } else if (10 <= e.num && e.num < 15) {
    // silver
    e.color = "10W";
    estensione = ".png";
  } else if (5 <= e.num && e.num < 10) {
    // bronze
    e.color = "5W";
    estensione = ".png";
  } else if (2 <= e.num && e.num < 5) {
    // blue
    e.color = "2W";
    estensione = ".png";
  } else if (e.num == 1) {
    // base
    e.color = "BASE";
    estensione = ".png";
  }

  console.log(e.num, e.color);

  let imgCardSrc =
    "assets/images/cards_gallery_mini/CARD_MINI_" + e.color + estensione;
  card.style.backgroundImage = `url(${imgCardSrc})`;
  card.style.backgroundSize = "cover"; // Optional: to ensure the background image covers the card
  card.style.width = 34 * pixelW + "px";
  card.style.height = 48 * pixelW + "px";
  card.style.imageRendering = "pixelated";
  // card.style.boxShadow = `0 var(--pixelH) 0 #888272`;

  let imgCtn = document.createElement("div");
  imgCtn.classList.add("flex-col");
  imgCtn.style.flexDirection = "reverse-column";

  imgCtn.style.alignItems = "center";
  imgCtn.style.justifyContent = "space-between";
  imgCtn.style.flexDirection = "column-reverse";
  imgCtn.style.height = 31 * pixelH + "px";
  imgCtn.style.paddingBottom = 4 * pixelH + "px";

  let img = document.createElement("img");

  let doggo = e.breed.razza.toUpperCase();
  img.src = "assets/images/cani/" + doggo + ".png";
  // console.log(e.breed);
  caneSize(e.breed);

  img.style.width = imgCane.width + "px";
  img.style.height = imgCane.height + "px";

  imgCtn.appendChild(img);

  // DIV DEGLI WAGGLE
  // faccio prima questo perchè in base al numero di waggle dovrò definire lo sfondo
  let waggleNumCtn = document.createElement("div");
  waggleNumCtn.classList.add("flex-row");
  waggleNumCtn.style.justifyContent = "center";
  waggleNumCtn.style.gap = 1 * pixelH + "px";
  waggleNumCtn.style.alignItems = "center";
  waggleNumCtn.style.height = 14 * pixelH + "px";

  let waggleNum = document.createElement("div");
  waggleNum.classList.add("text");

  waggleNum.innerHTML = e.num;

  let waggleHeart = document.createElement("img");
  waggleHeart.src = "assets/elements/card/CUORICINO_WAGGLE.png";
  waggleHeart.style.height = 6 * pixelH + "px";
  waggleHeart.style.width = 7 * pixelH + "px";

  waggleNumCtn.appendChild(waggleHeart);
  waggleNumCtn.appendChild(waggleNum);

  card.appendChild(imgCtn);
  card.appendChild(waggleNumCtn);

  waggleCtn.appendChild(card);
  cards.push(card);
});

////////////////////////////////////////////////////////////////

cards.forEach(function (card, i) {
  card.addEventListener("click", function () {
    sessionStorage.setItem(
      altriCaniArray[i].owner + "-" + altriCaniArray[i].name,
      JSON.stringify(altriCaniArray[i])
    ); // Storing data as JSON string

    console.log(
      sessionStorage.getItem(
        altriCaniArray[i].owner + "-" + altriCaniArray[i].name
      )
    );
    console.log(sessionStorage);

    // console.log(altriCaniArray[i]);
    window.open(
      "card_user.html" +
        "?key=" +
        name +
        "&user=" +
        altriCaniArray[i].owner +
        "-" +
        altriCaniArray[i].name,
      "_self"
    );
  });
});

//

function caneSize(cane) {
  razze.forEach((e, i) => {
    if (cane.razza.toUpperCase() == e.razza.toUpperCase()) {
      return (imgCane = { width: razze[i].width, height: razze[i].height });
      // }
    }
  });
}

////////////////////////////////////////////////////////////////////////

//BACK
let back = document.getElementById("back");
back.addEventListener("click", function () {
  window.open("match.html" + "?key=" + name, "_self");
});
