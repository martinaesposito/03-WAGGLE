//////VARIABLES

////FULL SCREEN

// window.addEventListener("load", openFullscreen);
function openFullscreen() {
  console.log("i'm fully loaded");
  var elem = document.documentElement;

  // if (elem.requestFullscreen) {
  //   elem.requestFullscreen();
  // } else
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

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////
////////////// BASIC DATA

let owner = [
  "aurora",
  "giacomo",
  "francesco",
  "andrea",
  "marco",
  "anita",
  "teresa",
  "martina",
  "oblio",
];
let o; //quando poi faccio la parte di log o sarà preso dall'url - nome del padrone

let names = [
  "aurora",
  "giacomo",
  "francesco",
  "andrea",
  "marco",
  "anita",
  "teresa",
  "martina",
  "oblio",
];
let n; //quando poi faccio la parte di log n sarà preso dall'url - nome del cane

let breeds = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
]; //these are not going to be true breeds but an array of twenty types of dog models you can choose from
let b = 4; //quando poi faccio la parte di log n sarà preso dall'url

let colors = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
];

let c; //- colore del cane
let id; //id del client
let stato = false; //decidi se in quel momento vuoi fare match o no
let bio =
  "breve testo di descrizione che posso lasciare sulle caratteristiche del mio cane?";

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
let bgC = "white";

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

let previousLat;
let previousLong;

let deltaX;
let deltaY;

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

let ossi = [];
let ossiFra = [];

let initialPos = false; //flag per la creazione degli ossi

let rValue; //valori randomici per la creazione degli ossi - prende un numero randomico nell'array di ossi messi a disposizione
let rand;

let ossiPos = false; //valore che controlla l'esistenza della posizione degli ossi

////////////////////////////////////////////////////////////////

//////FUNCTIONS

////////////// CONNECTION

let clientSocket = io(); // Create a new connection using socket.io

clientSocket.on("connect", newConnection); // function called on a new newConnection

function newConnection() {
  // callback function for "connect" messages
  // console.log("your id:", clientSocket.id);
  id = clientSocket.id;
}

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

  if (previousLat !== null && previousLong !== null) {
    // Calculate the distance vector in meters
    deltaX = geolib.getDistance(
      { latitude: previousLat, longitude: previousLong },
      { latitude: newLat, longitude: previousLong }
    );

    deltaY = geolib.getDistance(
      { latitude: previousLat, longitude: previousLong },
      { latitude: previousLat, longitude: newLong }
    );

    // Determine the direction (positive or negative)
    const adjustedDeltaX = newLat > previousLat ? -deltaX : deltaX;
    const adjustedDeltaY = newLong > previousLong ? -deltaY : deltaY;

    // Convert delta to screen coordinates
    const screenDelta = worldToScreen(adjustedDeltaX, adjustedDeltaY);
    console.log(screenDelta);

    // Update positions of all elements on the screen based on screenDelta
    updateElementPositions(screenDelta.x, screenDelta.y);
  }

  // Update the previous position to the current position
  previousLat = newLat;
  previousLong = newLong;

  clientSocket.emit("updateLocation", {
    userId: clientSocket.id,
    posX: newLat,
    posY: newLong,
  });

  if (!initialPos) {
    ossiCreation(newLat, newLong);
  }
}

//aggiorno gli elementi del mondo in relazione al vettore spostamento rispetto alla mia posizione precedente
function updateElementPositions(deltaX, deltaY) {
  //ricalcolo la posizione degli ossi al variare della posizione dell'utente
  ossi.forEach((osso) => {
    osso.posX -= deltaX;
    osso.posY -= deltaY;

    // ossiChecK(osso.posX, osso.posY); //controllo che la mia nuova posizione non corrisponda a nessun osso
  });
}

////////////////
///OOLD VERSION
// function appendLocation(location) {
//   lat = location.coords.latitude;
//   long = location.coords.longitude;

//   clientSocket.emit("updateLocation", {
//     //send al server la info - compresa la avarage position
//     userId: clientSocket.id,
//     posX: lat,
//     posY: long,
//   });

//   if (initialPos == false) {
//     //gli metto un flag che diventa vero la prima volta che viene eseguita e che mi permettde di far partire la funzione
//     ossiCreation(lat, long);
//   }
//

//
// else if (initialPos == true) {
//   calculateDistancesOssi(lat, long, ossi);
//   console.log("exists");
// }
//PROBLEAMA
//la posizione degli ossi in questo momento non cambia più - devo scrivere un vettore spostamento che mi permetta di riposizionare gli ossi in base a quanto la mia posizione nuova è variata rispetto a quella vecchia

// ossiChecK(lat, long); //ogni volta che si aggiorna la posizione controllo che non sia sovrapposta a nessun osso
//

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

function getRelativePosition(c1, c2, u) {
  const distance = geolib.getDistance(c1, c2); //calcolo la distanza tra le due coordinate
  const angle = geolib.getRhumbLineBearing(c1, c2); //prendo l'angolo rispetto al nord
  const angleRadians = (angle * Math.PI) / 180;

  // console.log(distance);
  // console.log(u);
  // console.log(angle);

  const mRelativeX = distance * Math.sin(angleRadians); //calcolo la distanza relativa rispetto al centro della canva
  const mRelativeY = distance * Math.cos(angleRadians);

  const pixelRelativePos = worldToScreen(mRelativeX, mRelativeY);

  return pixelRelativePos;
}

let remapPosN = 60; //questo è la distanza massima che posso raggiungere sommando dx e sx se sono nella visualizzazione normale

//devo scrivere la funzione che dice cosa fare se l'utente è fuori dalla canvas - per fare la visualizzazione zoomata
function worldToScreen(x, y) {
  // if (x > window.innerWidth || x < 0 || y > window.innerHeight || y < 0) {
  //   console.log("user too far from you");
  // } else
  return {
    x: Math.round(mapValue(x, 0, 60, 0, window.innerWidth)), //fa una proporzione della posizione del punto rispetto alla larghezza della canva - la distanza max è sempre di 25 m - c'è scritto 50 perchè è sia a dx che a sx
    y: Math.round(mapValue(y, 0, 60, 0, window.innerWidth)),
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

////////////// OSSI

function RandArray(array) {
  //prendo elemento random dell'array ossi
  rand = Math.floor(Math.random() * array.length) | 0;
  rValue = array[rand];

  // console.log(rand, rValue);
  ossi.push(rValue);

  // console.log(ossi);
  // return rValue;
}

function ossiCreation(lat, long) {
  console.log(ossiALL);
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

    ossiFra.push({
      tipologia: e.tipologia,
      contenuto: e.contenuto,
      posX: ossoPos.latitude,
      posY: ossoPos.longitude,
    });

    //console.log(ossoPos);
    e.posX = ossoPos.latitude;
    e.posY = ossoPos.longitude;

    initialPos = true;
  });
  //forse mi conviene calcolare la posizione imponendo un certo livello di distanza e un angolo random e poi da l' trovare due coordinate geogragiche
  //alla fine chiamo la funzione come per users quindi calculate distances ... per rimappare le nuove coordinate sullo schermo
  calculateDistancesOssi(lat, long, ossi);
  //calculateDistances(me, ossi);
}

///////// DISTANCE CALCULATION
function calculateDistancesOssi(lat, long, ossi) {
  ossi.forEach((osso) => {
    // if (!me.posX || !me.posY || !osso.posX || !osso.posY) return;

    //uso le stesse funzioni che avevo usato per calcolare la distanza tra me e gli utenti ma per definire quella tra me e gli ossi
    const position = getRelativePosition(
      { latitude: lat, longitude: long },
      { latitude: osso.posX, longitude: osso.posY },
      osso
    );

    osso.posX = window.innerWidth / 2 + position.x;
    osso.posY = window.innerHeight / 2 + position.y;
  });

  ossiPos = true;
  console.log(ossi);
}

let ossoFound = false;
//CHECK OSSO
// controllo se sono in corrispondenza di un osso
// devo un attimo fare un check per capire in che modo è espressa la posizione
function ossiChecK(x, y) {
  // ossi.forEach((o) => { //non mi serve fare un for loop visto che la funzione è già chiamata dentro un for Each
  if (
    Math.abs(x - window.innerWidth / 2) < 5 &&
    Math.abs(y - window.innerHeight / 2) < 5
  ) {
    console.log(osso);
    ossoFound = true;
    // clientSocket.emit("ossoFound", osso); - magari non mi serve fare un emit(?)
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function setup() {
  hhheight = windowHeight - (windowHeight / 100) * 0.3;
  wwwidth = hhheight * 0.46;
  // console.log(hhheight);
  createCanvas(wwwidth, hhheight); // create the artboard - proporzioni del mondo // create the artboard - proporzioni del mondo

  o = random(owner); //info sull'utente - che nella realtà riceverò poi dall'url
  n = random(names);
  b = random(breeds);
  c = random(colors);

  posX = lat;
  posY = long;
  // posX = 200;
  // posX = round(windowWidth / 2 + random(-windowWidth/4, windowWidth/4));
  // posY = round(windowHeight / 2 + random(-windowHeight / 4, windowHeight / 4));

  user = {
    owner: o,
    name: n,
    breed: b,
    color: c,
    bio: "mamma",
    stato: true,
    posY: posY,
    posX: posX,
  };
  // userPos = {
  //   posX: posX,
  //   posY: posY,
  // };

  emit();
}

function emit() {
  //che vengono mandate al server
  clientSocket.emit("userInfo", user);
  // clientSocket.emit("userPos", userPos);
  // console.log("user info:" + user);
}

const messageForm = document.querySelector(".create-osso");

messageForm.addEventListener("submit", (e) => {
  const message = messageForm.querySelector("input").value;
  const osso = {
    posX: me.posX,
    posY: me.posY,
    contenuto: message,
  };

  clientSocket.emit("newOsso", osso);

  e.preventDefault();
});

clientSocket.on("newOsso", (osso) => ossiFra.push(osso));

//////////////////////////////////////////////////////////////////////////

//////////// MATCHING
function draw() {
  bgC = "grey";
  background(bgC);

  textAlign(CENTER);
  textSize(16);
  fill("black");

  push();

  let ossoDistanceThreashold = 30;
  let ossoMessage = "Nessuno :(";

  if (me != null) {
    fill(me.color);
    m = ellipse(wwwidth / 2, hhheight / 2, 20);

    push();
    strokeWeight(1);
    stroke(200);
    fill(0, 5);
    ellipse(wwwidth / 2, hhheight / 2, ossoDistanceThreashold * 2);
    pop();

    users.forEach((element) => {
      fill(element.color);
      u = ellipse(element.posX, element.posY, 20);
    });

    ossiFra.forEach((osso) => {
      if (!me.posX || !me.posY || !osso.posX || !osso.posY) return;
      const position = getRelativePosition(
        { latitude: me.posX, longitude: me.posY },
        { latitude: osso.posX, longitude: osso.posY },
        osso
      );

      const posX = wwwidth / 2 + position.x;
      const posY = hhheight / 2 + position.y;

      let d = dist(wwwidth / 2, hhheight / 2, posX, posY);

      fill(d < ossoDistanceThreashold ? "yellow" : "white");
      if (d < ossoDistanceThreashold) {
        ossoFound = true;
        ossoMessage = osso.contenuto;
      }
      square(posX, posY, 10);
    });
  }

  // if (ossiPos == true) {
  //   ossi.forEach((os) => {
  //   });
  // }

  pop();

  needsUpdate = false;

  //ACCELEROMETRO
  accX = round(accelerationX);
  accY = round(accelerationY);
  accZ = round(accelerationZ);
  text("X: " + accX, wwwidth / 2, hhheight / 2 - 20);
  text("Y: " + accY, wwwidth / 2, hhheight / 2);
  text("Z: " + accZ, wwwidth / 2, hhheight / 2 + 20);

  let display = touches.length + " touches";
  text(display, wwwidth / 2, hhheight / 2 + 80);

  if (touches.length == 0 && !isMatched) {
    //se non sto toccando o smetto di toccare + non ho matchato reset dello stato
    bgC = "white";
    check = "no friends :(";
    isPressing = false;
  }

  text(check, wwwidth / 2, hhheight / 2 - 120); //testo che mi conferma che abbiamo fatto match
  text(me?.posX + ", " + me?.posY, wwwidth / 2, 50);

  text("delta ossa" + deltaX + ", " + deltaY, wwwidth / 2, 100);

  text("Messaggio dall'osso: " + ossoMessage, wwwidth / 2, 150);
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

  bgC = "red";
  check = "uaaaaau";

  console.log(users);
  console.log("me");
  console.log(me);
  // console.log(meAndYou);
  // console.log(meAndYou.you);
  // me = users.find((e) => e.id == meAndYou.me);
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
  newCard.class("card");

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
        // Create a new uSel div with updated content
        // console.log(
        //   "vuoi fare match con " + element.name + " e " + element.owner
        // );

        meAndYou = { me: clientSocket.id, you: element };
        clientSocket.emit("chosenUser", meAndYou);
      }
    }
  });
}

clientSocket.on("youGotChosen", (user) => {
  // console.log( user + " wants to match with you" );
  uMatch = user + " wants to match with you";

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
