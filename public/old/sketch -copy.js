// KEY
//leggo i parametri dall'url per
let params = new URLSearchParams(document.location.search);
let name = params.get("key");

const storedUserData = sessionStorage.getItem(name); // Use sessionStorage
const userData = storedUserData ? JSON.parse(storedUserData) : null;

// console.log(userData);

////////////////////////////////////////////////////////////////////////

//////VARIABLES

// WAGGLE COLOR
let waggleColor = "#298EFF";

//CANVACONTAINER
let canvactn;
let cnv;

////SFONDONE
let sfondo;

let map;
let mapXDistance;
let mapYDistance;
let mapPixelDistance;

let mapExists;

////////////////////////////////////////////////////////////////////////////////////////////////

////////////// BASIC DATA

// let owner = [
//   "aurora",
//   "giacomo",
//   "francesco",
//   "andrea",
//   "marco",
//   "anita",
//   "teresa",
//   "martina",
//   "oblio",
// ];
// let o; //quando poi faccio la parte di log o sarà preso dall'url - nome del padrone

// let names = [
//   "aurora",
//   "giacomo",
//   "francesco",
//   "andrea",
//   "marco",
//   "anita",
//   "teresa",
//   "martina",
//   "oblio",
// ];
// let n; //quando poi faccio la parte di log n sarà preso dall'url - nome del cane

// let breeds = [
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
// ]; //these are not going to be true breeds but an array of twenty types of dog models you can choose from
// let b; //quando poi faccio la parte di log n sarà preso dall'url

// let colors = [
//   "#FF6633",
//   "#FFB399",
//   "#FF33FF",
//   "#FFFF99",
//   "#00B3E6",
//   "#E6B333",
//   "#3366E6",
//   "#999966",
//   "#99FF99",
//   "#B34D4D",
//   "#80B300",
//   "#809900",
//   "#E6B3B3",
//   "#6680B3",
//   "#66991A",
//   "#FF99E6",
//   "#CCFF1A",
//   "#FF1A66",
//   "#E6331A",
//   "#33FFCC",
//   "#66994D",
//   "#B366CC",
//   "#4D8000",
//   "#B33300",
//   "#CC80CC",
//   "#66664D",
//   "#991AFF",
//   "#E666FF",
//   "#4DB3FF",
//   "#1AB399",
//   "#E666B3",
//   "#33991A",
//   "#CC9999",
//   "#B3B31A",
//   "#00E680",
//   "#4D8066",
//   "#809980",
//   "#E6FF80",
//   "#1AFF33",
//   "#999933",
//   "#FF3380",
//   "#CCCC00",
//   "#66E64D",
//   "#4D80CC",
//   "#9900B3",
//   "#E64D66",
//   "#4DB380",
//   "#FF4D4D",
//   "#99E6E6",
//   "#6666FF",
// ];
// let c; //- colore del cane

// let bio =
//   "breve testo di descrizione che posso lasciare sulle caratteristiche del mio cane?";

// IMMAGINI RAZZE

let bassotto;
let cocker;
let eskimo;
let dalmata;
let cuintle;

let razze = [];
let cane;
let caneUtente;

let id; //id del client
let stato = false; //decidi se in quel momento vuoi fare match o no

let user = {}; //all the data related to the user

let me;
let m;

let users = []; //all the data related to all the users

let u; //cerchiolino che identifica l'utente
let userPos = {};
let posX;
let posY;
let needsUpdate = false;

//////////// MATCH

let canShake = false; //entri nella modalità match
let isPressing = false; //controlla che tu stia premendo

let isMatched = false;
let check = "no friends :(";
let bgC;

let uMatch;
let uMBoolean = false;

let accX = 0;
let accY = 0;
let accZ = 0;
let message;

let uSel; //div che si crea quando clicco su un utente
let uSelC;
let uSelO;
let uSelD;
let touchT = false;

let meAndYou;

let pMatch; //div and element per accettare match
let pYes;
let pNo;

//////////// GET POSITION AND SEND POSITION

let lat;
let long;

var watchId;

let positions = [];

let distances = [];

let newLat; //variabili che mi servono per calcolare delra x e y ossia il valore spostamento che riposiziona il mondo in base a quanto mi sono spostato
let newLong;

let remapPosN = 60; //questo è la distanza massima che posso raggiungere sommando dx e sx se sono nella visualizzazione normale

//////////// EXCHANGE CARD

let newCard;
let newCardCtn;

let cardName;
let cardDog;

//////////// OSSI

let ossiALL = [
  //creo un unico array con diverse tipologie di elementi - messaggi e guardaroba
  {
    tipologia: "guardaroba",
    nome: "una maglietta blu",
    contenuto: "maglieta-blu.png",
    posY: "",
    posX: "",
  },
  {
    tipologia: "guardaroba",
    nome: "un collare rosso",
    contenuto: "maglieta-blu.png",
    posY: "",
    posX: "",
  },
  {
    tipologia: "guardaroba",
    nome: "una coroncina oro",
    contenuto: "maglieta-blu.png",
    posY: "",
    posX: "",
  },
  {
    tipologia: "guardaroba",
    nome: "delle calze rosa",
    contenuto: "maglieta-blu.png",
    posY: "",
    posX: "",
  },
  {
    tipologia: "guardaroba",
    nome: "degli occhiali da sole",
    contenuto: "maglieta-blu.png",
    posY: "",
    posX: "",
  },
  //messaggi
  {
    tipologia: "messaggio",
    contenuto: "Ciao </br> da Tobiaaaa",
    posY: "",
    posX: "",
  },
  {
    tipologia: "messaggio",
    contenuto: "Bau Bau </br> - Tommy",
    posY: "",
    posX: "",
  },
  {
    tipologia: "messaggio",
    contenuto: "Miao Miao </br> Clea <3",
    posY: "",
    posX: "",
  },
  {
    tipologia: "messaggio",
    contenuto: "*waggle waggle*",
    posY: "",
    posX: "",
  },
  {
    tipologia: "messaggio",
    contenuto: "Birretta martedì sera? </br> da Ricky e Luna",
    posY: "",
    posX: "",
  },
];

let os;
let osso;

let ossi = []; //array di ossi che effettivamente posiziono

let initialPos = false; //flag per la creazione degli ossi

let rValue; //valori randomici per la creazione degli ossi - prende un numero randomico nell'array di ossi messi a disposizione
let rand;

let ossiPos = false; //valore che controlla l'esistenza della posizione degli ossi
let ossoFound = false;

let ossoDistanceThreashold = 30; //Area di treshold per cui se incontro un osso vedo il messaggio

let ossoMessage = "Nessuno :("; //finchè non trovo un osso visualizzo questo messaggio

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

//////FUNCTIONS

/////PRELOAD IMMAGINI

function preload() {
  // caneprova = loadImage("assets/images/cani/BASSOTTO.gif");

  // bassotto = loadImage("assets/images/cani/BASSOTTO.gif");
  // cocker = loadImage("assets/images/cani/COCKER.png");
  // eskimo = loadImage("assets/images/cani/ESKIMO.png");
  // dalmata = loadImage("assets/images/cani/DALMATA.png");
  // cuintle = loadImage("assets/images/cani/LEVRIERO.png");

  // razze.push(bassotto, cocker, eskimo, dalmata, cuintle);

  sfondo = loadImage("assets/images/MAPPA_PROVVISORIA.png");
}

////////////// CONNECTION

let clientSocket = io(); // Create a new connection using socket.io

clientSocket.on("connect", () => {
  id = clientSocket.id;
});

clientSocket.on("mapExists", (existingMap) => {
  map = existingMap;
  mapExists = true;
});

let usersDogs = [];
clientSocket.on("userDisplay", (data) => {
  //visualizzo tutti gli utenti collegati - o meglio raccolgo le informazioni sulle schede aperte all'interno di un array che si aggiorna ad ogni nuova connessione
  users = [];
  users = data;
  users = data.filter((user) => user.id !== clientSocket.id); // tolgo me stesso dall'elenco di utenti
  me = data.find((element) => element.id == clientSocket.id); //salvo le informazioni relative a me stesse nella variabile me

  // users.forEach((user) => console.log(user.name, user.posX, user.posY));
  // console.log(me.name, me.posX, me.posY);

  calculateDistances(me, users); //una volta che riceve le informazioni di tutti gli utenti, calcolo la distanza tra me e tutti gli altri
});

clientSocket.on("userDisconnected", (data) => {
  // Handle user disconnection on client side
  users = [];
  users = data;
  users = data.filter((user) => user.id !== clientSocket.id);
  me = data.find((element) => element.id == clientSocket.id);

  calculateDistances(me, users);
});

////////////////////////////////////////////////////////////////////////

//////////// GET POSITION AND SEND POSITION

function appendLocation(location) {
  newLat = location.coords.latitude;
  newLong = location.coords.longitude;

  clientSocket.emit("updateLocation", {
    userId: clientSocket.id,
    posX: newLat,
    posY: newLong,
  });

  if (!mapExists && !initialPos) {
    ossiCreation(newLat, newLong); //creo gli ossi

    sfondoCreation(newLat, newLong); //creo lo sfondo
  }
}

//
// // TENTATIVO FACENDO LA MEDIA DELLE POSIZIONI
// function appendLocation(location) {
//   lat = location.coords.latitude;
//   long = location.coords.longitude;
//   updatePositions({ latitude: lat, longitude: long }); // Update positions array

//   const averagePosition = geolib.getCenterOfBounds(positions); // Calculate the average position

//   // console.log(averagePosition);
//   // console.log(positions);

//   // Emit the average position
//   clientSocket.emit("updateLocation", {
//     userId: clientSocket.id,
//     posX: averagePosition.latitude,
//     posY: averagePosition.longitude,
//   });
// }
// function updatePositions(newPosition) {
//   //funzione che aggiorna l'array delle posizioni

//   positions.push(newPosition); // Add the new position

//   if (positions.length > 5) {
//     positions.splice(0, 1); // Remove the oldest position
//   }
// }

// Initialize the previous position when the page loads
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function (location) {
    previousLat = location.coords.latitude;
    previousLong = location.coords.longitude;
    appendLocation(location);
  });
  watchId = navigator.geolocation.watchPosition(
    appendLocation,
    (error) => console.log(error),
    { maximumAge: 0, timeout: 3000, enableHighAccuracy: true }
  );
} else {
  target.innerText = "Geolocation API not supported.";
}

///////// DISTANCE CALCULATION
function calculateDistances(me, users) {
  distances = [];

  users.forEach((user) => {
    if (!me.posX || !me.posY || !user.posX || !user.posY) return;
    const position = getRelativePosition(
      { latitude: me.posX, longitude: me.posY },
      { latitude: user.posX, longitude: user.posY },
      user
    );

    user.posX = windowWidth / 2 + position.x;
    user.posY = windowHeight / 2 + position.y;
  });
}

function getRelativePosition(c1, c2) {
  const distance = geolib.getDistance(c1, c2); //calcolo la distanza tra le due coordinate
  const angle = geolib.getRhumbLineBearing(c1, c2); //prendo l'angolo rispetto al nord
  const angleRadians = (angle * Math.PI) / 180;

  const mRelativeX = distance * Math.sin(angleRadians); //calcolo la distanza relativa rispetto al centro della canva
  const mRelativeY = distance * Math.cos(angleRadians);

  const pixelRelativePos = worldToScreen(mRelativeX, mRelativeY);

  return pixelRelativePos;
}

//devo scrivere la funzione che dice cosa fare se l'utente è fuori dalla canvas - per fare la visualizzazione zoomata
function worldToScreen(x, y) {
  return {
    x: Math.round(mapValue(x, 0, 60, 0, window.innerWidth)), //fa una proporzione della posizione del punto rispetto alla larghezza della canva - la distanza max è sempre di 25 m - c'è scritto 50 perchè è sia a dx che a sx
    y: Math.round(mapValue(y, 0, 60, 0, window.innerWidth)),
  };
}

//devo scrivere la funzione che dice cosa fare se l'utente è fuori dalla canvas - per fare la visualizzazione zoomata
function screenToWorld(x, y) {
  return {
    x: Math.round(mapValue(x, 0, window.innerWidth, 0, 60)), //fa una proporzione della posizione del punto rispetto alla larghezza della canva - la distanza max è sempre di 25 m - c'è scritto 50 perchè è sia a dx che a sx
    y: Math.round(mapValue(y, 0, window.innerWidth, 0, 60)),
  };
}

function mapValue(n, start1, stop1, start2, stop2, withinBounds) {
  const newval = ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  if (!withinBounds) {
    return newval;
  }
  if (start2 < stop2) {
    return constrain(newval, start2, stop2);
  } else {
    return constrain(newval, stop2, start2);
  }
}

////////////////////////////////////////////////////////////////////////
// CANI

function doggosFind(users) {
  //DOGGS
  users.forEach((user) => {
    caneUtente = loadImage("assets/images/cani/" + user.breed + ".png");
    usersDogs.push(caneUtente);
  });
}

////////SFONDO

///function che ascolta la posizione della mappa dal server

//CREO LO SFONDO
function sfondoCreation(lat, long) {
  //calcoliamo la distanza in metri tra me e la mappa

  console.log(lat, long, pixelW, pixelH);

  mapXDistance = -(pixelW * 710); //la distanza tra me e la mappa in pixel
  mapYDistance = -(pixelH * 745);
  console.log(mapXDistance, mapYDistance);

  let mapDistance = screenToWorld(mapXDistance, mapYDistance);
  console.log(mapDistance);

  const angle = (Math.atan(mapDistance.x / mapDistance.y) * 180) / Math.PI;
  console.log(angle);

  let mapDistanceIpo = Math.sqrt(
    mapDistance.x * mapDistance.x + mapDistance.y * mapDistance.y
  );

  console.log(mapDistanceIpo);

  //calcolo la radiche quadrata

  let mappaPoint = geolib.computeDestinationPoint(
    { latitude: lat, longitude: long },
    mapDistanceIpo,
    angle
  );

  clientSocket.emit("map", mappaPoint);
}

clientSocket.on("map", (value) => {
  map = value;
  console.log(map);
});

////////////// OSSI
//prendo elemento random dell'array ossi
function RandArray(array) {
  rand = Math.floor(Math.random() * array.length) | 0;
  rValue = array[rand];
  ossi.push(rValue);
}
//Creo gli ossi
function ossiCreation(lat, long) {
  // console.log(ossiALL);
  for (let i = 0; i <= 3; i++) {
    RandArray(ossiALL);
  }

  ///qui devo scrivere una funzione che itera per ossi associando a ciascun osso una posizione x e y a partire da quella di partenza
  ossi.forEach((e) => {
    let ranDistance = Math.floor(Math.random() * (35 - 5)) + 5; //disegno un osso ad una distanza random compresa tra 5 e 35 m di distanza da quella originale
    let ranAngle = Math.floor(Math.random() * (360 - 1)) + 1;

    let ossoPos = geolib.computeDestinationPoint(
      { latitude: lat, longitude: long },
      ranDistance,
      ranAngle
    );

    e.posX = ossoPos.latitude; //coordinate geografiche degli ossi
    e.posY = ossoPos.longitude;

    initialPos = true;
  });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function setup() {
  //CREO CNVCTN/ / creo il div che contiene la canva
  canvactn = createDiv();
  canvactn.class("canvactn");

  bgC = 200; //colore di sfondo grigio

  // CREO CTN
  // cnv = createCanvas(wwwidth, hhheight);
  // create the artboard - proporzioni del mondo // create the artboard - proporzioni del mondo
  createCanvas(windowWidth, windowHeight);
  canvactn.child(cnv);
  // document.body.child(canvactn);

  // o = random(owner); //info sull'utente - che nella realtà riceverò poi dall'url
  // n = random(names);
  // b = random(breeds);
  // c = random(colors);

  //posizioni iniziali per ciascun utente
  posX = lat;
  posY = long;

  user = {
    owner: userData.owner,
    name: userData.name,
    breed: userData.breed,
    color: userData.color,
    bio: userData.bio,
    age: userData.age,
    size: userData.size,
    stato: true,
    posY: posY,
    posX: posX,
  };

  cane = loadImage("assets/images/cani/" + user.breed + ".png");

  console.log(user);
  emit();

  //CREO LO SFONDO
  sfondo = createImg("assets/images/MAPPA_PROVVISORIA.png");
  sfondo.class("sfondo");
  sfondo.position(0, 0);
  sfondo.size(pixelW * 1020, pixelH * 1400);
}

function emit() {
  //che vengono mandate al server
  clientSocket.emit("userInfo", user);
}

//NEW OSSO CREATION
//DIV CHE DOVRò ricreare in javascript per fare il bottone
const messageForm = document.querySelector(".create-osso");

messageForm.addEventListener("submit", (e) => {
  const message = messageForm.querySelector("input").value;
  const osso = {
    posX: me.posX,
    posY: me.posY,
    contenuto: message,
  };

  clientSocket.emit("newOsso", osso); //pusho un osso da mandare a tutti i client quando ne creo uno nuovo
  e.preventDefault();
});

clientSocket.on("newOsso", (osso) => ossi.push(osso));

//////////////////////////////////////////////////////////////////////////

let mapCoord = { x: "", y: "" };
//////////// MATCHING
function draw() {
  // background(bgC);
  clear(); //faccio il clear perchè senza un colore di sfondo succede un casino

  textAlign(CENTER);
  textSize(16);
  fill("black");

  push();

  // PIXEL EFFECT NITIDO
  noSmooth();

  //VERIFICO CHE ESISTO
  if (me != null) {
    //Se esisto creo tutte le cose
    // console.log(me);

    // SFONDO
    if (mapXDistance != null && map) {
      mapCoord = { x: map.latitude, y: map.longitude };

      const { x, y } = getRelativePosition(
        { latitude: me.posX, longitude: me.posY }, //calcolo la posizione della mappa rispetto a me - lo faccio nel draw in modo che si aggiorni
        map
      );
      sfondo.position(-x, -y);
    }

    //ME STESSO AL CENTRO
    push();
    strokeWeight(1);
    stroke(0);
    fill(me.color);
    ellipse(windowWidth / 2, windowHeight / 2, ossoDistanceThreashold * 2);

    image(
      cane, //cane che sono io
      windowWidth / 2 - (pixelW * cane.width) / 16, //al centro - la metà delle dimensioni del cane
      windowHeight / 2 - (pixelH * cane.height) / 16, //al centro - la metà delle dimensioni del cane
      (pixelW * cane.width) / 8,
      (pixelH * cane.height) / 8
    );

    pop();

    //DISEGNO GLI UTENTI
    users.forEach((element, i) => {
      fill(element.color);
      u = ellipse(element.posX, element.posY, 20);
      // console.log(usersDogs);
      // image(
      //   usersDogs[i], //cane che sono io
      //   element.posX - (pixelW * usersDogs[i].width) / 16, //al centro - la metà delle dimensioni del cane
      //   element.posY - (pixelH * usersDogs[i].height) / 16, //al centro - la metà delle dimensioni del cane
      //   (pixelW * usersDogs[i].width) / 8,
      //   (pixelH * usersDogs[i].height) / 8
      // );
    });

    //DISEGNO GLI OSSI
    ossi.forEach((osso) => {
      if (!me.posX || !me.posY || !osso.posX || !osso.posY) return;
      const position = getRelativePosition(
        { latitude: me.posX, longitude: me.posY },
        { latitude: osso.posX, longitude: osso.posY },
        osso
      );

      const posX = windowWidth / 2 + position.x;
      const posY = windowHeight / 2 + position.y;

      //controllo che la mia nuova posizione non corrisponda a nessun osso
      let d = dist(windowWidth / 2, windowHeight / 2, posX, posY);

      fill(d < ossoDistanceThreashold ? "yellow" : "white"); //se sì cambia il colore in giallo e fa comparire il messaggio dell'osso in alto
      //dovrò trasformare questa cosa in un pop up
      if (d < ossoDistanceThreashold) {
        ossoFound = true;
        ossoMessage = osso.contenuto;
      }
      square(posX, posY, 10);
    });
  }

  pop();

  //PROVO A DISEGNARE UN PIXEL
  push();
  noStroke();
  fill("green");
  rect(0, 150, pixelW, pixelH);
  pop();

  //ACCELEROMETRO
  accX = round(accelerationX);
  accY = round(accelerationY);
  accZ = round(accelerationZ);
  text("X: " + accX, windowWidth / 2, windowWidth / 2 - 20);
  text("Y: " + accY, windowWidth / 2, windowWidth / 2);
  text("Z: " + accZ, windowWidth / 2, windowWidth / 2 + 20);

  let display = touches.length + " touches";
  text(display, windowWidth / 2, windowWidth / 2 + 80);

  if (touches.length == 0 && !isMatched) {
    //se non sto toccando o smetto di toccare + non ho matchato reset dello stato
    bgC = 200;
    check = "no friends :(";
    isPressing = false;
  }

  text(check, windowWidth / 2, windowWidth / 2 - 120); //testo che mi conferma che abbiamo fatto match
  text(me?.posX + ", " + me?.posY, windowWidth / 2, 50);
  text(
    "coordinate mappa " + mapCoord.x + ", " + mapCoord.y,
    windowWidth / 2,
    75
  );
  text("Messaggio dall'osso: " + ossoMessage, windowWidth / 2, 150);
}

function deviceShaken() {
  if (isPressing == false && canShake == true && !isMatched) {
    if (touches.length >= 1) {
      bgC = "yellow";

      message = meAndYou; //messaggio corrisponde al nome dei due utenti

      clientSocket.emit("shake", message);
      isPressing = true;
    }
  }
}

//funzione quando effettivamente facciamo match - cambia il colore dello schermo
clientSocket.on("itsAMatch", (meAndYou) => {
  //ok non so bene perchè ma una cosa importante è aveerlo capito
  //meandyou.me è in realtà you e viceversa

  isMatched = true;

  bgC = waggleColor;
  check = "uaaaaau";

  console.log("me");
  console.log(me);

  you =
    users.find((e) => e.id == meAndYou.me) ||
    users.find((e) => e.id == meAndYou.you);

  console.log("you");
  console.log(you);

  //creo la carta con le info del cane
  //per la creazione del design della carta forse mi conviene scrivere una funzione a parte se non addirittura un file js separato
  newCard = createDiv();
  cardName = createDiv(you.owner);
  cardDog = createDiv(you.name);
  newCard.class("card flex-col");

  newCard.child(cardName);
  newCard.child(cardDog);

  setTimeout(() => {
    isMatched = false;
    canShake = false;
    meAndYou;

    newCard.remove();
  }, 10000);
});

//scelgo con chi voglio fare match
function mouseClicked() {
  // console.log(me.posX, me.posY);
  users.forEach((element) => {
    //al tocco su uno degli utenti
    if (!touchT) {
      if (
        mouseX >= element.posX - 20 &&
        mouseX <= element.posX + 20 &&
        mouseY >= element.posY - 20 &&
        mouseY <= element.posY + 20
      ) {
        meAndYou = { me: clientSocket.id, you: element };
        clientSocket.emit("chosenUser", meAndYou);
      }
    }
  });
}

clientSocket.on("youGotChosen", (user) => {
  // console.log( user + " wants to match with you" );
  uMatch = user + " wants to waggle with you";

  meAndYou = { me: clientSocket.id, you: user };

  // uMBoolean=true;
  // if(uMBoolean==true){
  pMatch = createDiv(uMatch);
  pMatch.style("background-color", "yellow");
  pMatch.position(windowWidth / 2, windowHeight / 2 + 100);

  pYes = createButton("yes", "yes");
  pYes.position(windowWidth / 2 - 40, windowHeight / 2 + 120);

  pNo = createButton("no", "no");
  pNo.position(windowWidth / 2 + 40, windowHeight / 2 + 120);

  pYes.mousePressed(() => {
    clientSocket.emit("accepted", meAndYou);
  });
});

clientSocket.on("startShake", () => {
  pYes?.remove();
  pNo?.remove();
  pMatch?.remove();

  canShake = true;
  // console.log("start shaking!");
});

////////////////////////////////////////////////////////
function windowResized() {
  hhheight = windowHeight - 22 * pixelH;
  wwwidth = windowWidth * 0.46;
  resizeCanvas(windowWidth, windowHeight);
}

//
//
//
//TENTATIVO 2 DI CALCOLO NON PRECISISSIMO - fatto con Chatpgt
// function calculateDistances(me, users) {
//   distances = [];
//   let wwfratto2 = windowWidth / 2;
//   let whfratto2 = windowHeight / 2;

//   // Make a copy of users array to iterate safely
//   let usersToCheck = [...users];

//   usersToCheck.forEach((user) => {
//     let deltaX = round((user.posX - me.posX) * 1000);
//     let deltaY = round((user.posY - me.posY) * 1000);

//     // Calculate distance without the extra multiplication and rounding
//     let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

//     if (
//       Math.abs(deltaX) <= wwfratto2 &&
//       Math.abs(deltaY) <= whfratto2 &&
//       distance <= 25
//     ) {
//       // Push valid distances to array
//       distances.push({
//         id: user.id,
//         x: deltaX,
//         y: deltaY,
//         distance: distance,
//       });

//       user.posX = wwfratto2 + deltaX;
//       user.posY = whfratto2 + deltaY;
//     } else {
//       // Remove user if outside bounds
//       users.splice(users.indexOf(user), 1);
//     }
//   });

//   console.log(users);
// }
//
//
//
//
//
///TENTATIVO CALCOLO DELLA DISTANZA 3 - usando geolib
// distances = [];

// users.forEach((user) => {
//   let distance = geolib.getPreciseDistance(
//     { latitude: me.posX, longitude: me.posY },
//     { latitude: user.posX, longitude: user.posY },
//     0.5
//   );

//   let bearing = geolib.getGreatCircleBearing(
//     { latitude: me.posX, longitude: me.posY },
//     { latitude: user.posX, longitude: user.posY }
//   );
//   console.log("distance " + distance, "bearing " + bearing);

//   let point = geolib.computeDestinationPoint(
//     { latitude: user.posX, longitude: user.posY },
//     distance,
//     bearing,
//     (radius = earthRadius)
//   );
//   console.log(point);

//   let wwfratto2 = windowWidth / 2;
//   let whfratto2 = windowHeight / 2;

// if (
//   abs(deltaX) <= wwfratto2 &&
//   abs(deltaY) <= whfratto2 &&
//   distance <= 25
// ) {
//   //se la distanza tra il valore assoluto di x e il centro e il valore assoluto di y e il centro è compresa nella metà della canva - corrispondente circa a un raggio di 25 metri di distanza max - allora la distanza viene pushata e l'elemento viene visualizzato
//   // viceversa se la distanza è superiore l'utente viene spliceato dall'array in modo che non sia possibile fare match
//   distances.push({
//     id: user.id,
//     x: deltaX,
//     y: deltaY,
//     distance: distance,
//   });

//   user.posX = windowWidth / 2 + deltaX;
//   user.posY = windowHeight / 2 + deltaY;
// } else users.splice(users.indexOf(user), 1);
//   });

//   console.log(users);
// }

//
//
//
//
//
//
//
// function calculateDistances(me, users) {
//   distances = [];
//   users.forEach((user) => {
//     let deltaX = user.posX - me.posX;
//     let deltaY = user.posY - me.posY;

//     // Convert degrees to meters (approximation)
//     const metersPerDegree = 111320; // Average meters per degree of latitude/longitude
//     let distanceX = deltaX * metersPerDegree;
//     let distanceY = deltaY * metersPerDegree;

//     let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

//     if (distance <= 25) {
//       distances.push({
//         id: user.id,
//         x: deltaX,
//         y: deltaY,
//         distance: distance,
//       });

//       // Scale positions for drawing on the canvas
//       user.posX = windowWidth / 2 + (deltaX * windowWidth) / 50; // Adjust the scale for better visualization
//       user.posY = windowHeight / 2 + (deltaY * windowHeight) / 50; // Adjust the scale for better visualization
//     } else {
//       users.splice(users.indexOf(user), 1);
//     }
//   });

//   console.log(users);
// }

//   uSel = createDiv("");
//   uSelO= element.owner;
//   uSelD= element.name;

//   uSel.position(windowWidth / 2, windowHeight / 2 + 120);
//   uSel.style("background-color", element.color);
//   uSel.style("text-align", "center");
//   uSel.style("color", "black");
//   touchT = true;
//   }

// if (uSel) {
//   uSel.remove();
// }

// //////////////

// console.log(me.name, user.name, position);

//   let c = { posX: me.posX, posY: user.posY }; //disegno due punti che sono la proiezione dell'altro punto rispetto a un asse verticale
//   let d = { posX: user.posX, posY: me.posY };
//   let deltaX = round(
//     ((c.posX - me.posX) * 2 + (c.posY - me.posY) * 2) * 2000000
//   );
//   let deltaY = round(
//     ((d.posX - me.posX) * 2 + (d.posY - me.posY) * 2) * 2000000
//     //la mia è una proporzione brutale in cui la distanza viene moltiplicata x 10 per cui un mentro è 10 pixel circa
//   );
//   let wwfratto2 = windowWidth / 2;
//   let whfratto2 = windowHeight / 2;
//   // la canva nel suo complesso misura circa 400 x 600 pixels il che significa che la distanza massima che viene visualizzata tra due persone corrisponde a circa 20/25 metri
//   let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
//   // console.log(deltaX, deltaY);
//   if (
//     abs(deltaX) <= wwfratto2 &&
//     abs(deltaY) <= whfratto2 &&
//     distance <= 25
//   ) {
//     //se la distanza tra il valore assoluto di x e il centro e il valore assoluto di y e il centro è compresa nella metà della canva - corrispondente circa a un raggio di 25 metri di distanza max - allora la distanza viene pushata e l'elemento viene visualizzato
//     // viceversa se la distanza è superiore l'utente viene spliceato dall'array in modo che non sia possibile fare match
//     distances.push({
//       id: user.id,
//       x: deltaX,
//       y: deltaY,
//       distance: distance,
//     });
//     user.posX = windowWidth / 2 + deltaX;
//     user.posY = windowHeight / 2 + deltaY;
//   } else users.splice(users.indexOf(user), 1);
