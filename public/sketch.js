// KEY
//leggo i parametri dall'url per andare a leggere il sessionstorage
let params = new URLSearchParams(document.location.search);
let name = params.get("key");

const storedUserData = sessionStorage.getItem(name); // Use sessionStorage
const userData = storedUserData ? JSON.parse(storedUserData) : null;

////////////////////////////////////////////////////////////////////////

//////VARIABLES

// WAGGLE COLOR
let waggleColor = "#298EFF";

//CANVACONTAINER
let canvactn;
let cnv;

////SFONDONE
let sfondo;

let map, mapXDistance, mapYDistance, mapPixelDistance;

let mapExists;

////////////////////////////////////////////////////////////////////////////////////////////////

////////////// BASIC DATA

// IMMAGINI RAZZE

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
let cane;
let imgCane = { width: "", height: "" };
let caniSrcs = {}; //array di tutte le razze di cani

let user = {}; //all the data related to the user
let users = []; //all the data related to all the users

let id;

let me, you;

let userPos = {};
let posX, posY;
let needsUpdate = false;

//////////// MATCH

let stato = false; //variabile che regola se sto facendo match o meno - nel caso in cui sia già impegnato in un altro match o nel caso in cui stia trovando un osso
let canShake = false; //entri nella modalità match
let isPressing = false; //controlla che tu stia premendo mentre faccio wagglve
let isMatched = false;

let accX = 0;
let accY = 0;
let accZ = 0;
let message;

let meAndYouVar;

//////////// USER CARD

let youAndme = []; //array in cui vengono pushati i due utenti
let youAndmeImg = []; //array in cui vengono pushate le loro immagini
let cardCreated = false;

let txtDone; //div di conferma fine waggle
let card;

let timer;

//////////// GET POSITION AND SEND POSITION

let lat, long;

let remapPosN = 60; //questo è la distanza massima che posso raggiungere sommando dx e sx se sono nella visualizzazione normale

let mapCoord = { x: "", y: "" };

//////////// OSSI

let ossiALL = [
  //creo un unico array con diverse tipologie di elementi - messaggi e guardaroba
  {
    tipologia: "guardaroba",
    nome: "UN PAIO DI CUFFIE BLU!",
    contenuto: "ACCESSORIO-8.png",
    posY: "",
    posX: "",
  },
  {
    tipologia: "guardaroba",
    nome: "UNA PALLA DA BASKET :)",
    contenuto: "OGGETTO-2.png",
    posY: "",
    posX: "",
  },
  {
    tipologia: "guardaroba",
    nome: "UN HAPPY MEAL! </br> GNAM GNAM",
    contenuto: "OGGETTO-7.png",
    posY: "",
    posX: "",
  },
  {
    tipologia: "guardaroba",
    nome: "DELLE MUTANDINE ROSSE ;)",
    contenuto: "VESTITO-2.png",
    posY: "",
    posX: "",
  },
  {
    tipologia: "guardaroba",
    nome: "DEGLI OCCHIALI FIGHISSIMI!",
    contenuto: "ACCESSORIO-7.png",
    posY: "",
    posX: "",
  },
  //messaggi
  {
    tipologia: "messaggio",
    contenuto:
      "Cacaoooo</br>meravigliaooo</br>che meraviglia sto cacao meravigliaooo",
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

let ombrina;

function preload() {
  // caneprova = loadImage("assets/images/cani/BASSOTTO.gif");
  caniSrcs = razze.map((r) => ({
    breed: r,
    image: loadImage("assets/images/cani/" + r.toUpperCase() + ".png"),
  }));

  sfondo = loadImage("assets/images/BACKGROUND.png");
  ombrina = loadImage("assets/images/cani/shadow.png");
}

////////////// CONNECTION

let clientSocket = io(); // Create a new connection using socket.io

clientSocket.on("connect", () => {
  id = clientSocket.id;

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
    sesso: userData.sesso,
    stato: false,
    posY: posY,
    posX: posX,
  };

  emit();
});

clientSocket.on("mapExists", (existingMap) => {
  map = existingMap;
  console.log("la mappa esiste già", map);
  mapExists = true;
});

clientSocket.on("userDisplay", (data) => {
  // console.log(data);
  //visualizzo tutti gli utenti collegati - o meglio raccolgo le informazioni sulle schede aperte all'interno di un array che si aggiorna ad ogni nuova connessione
  let otherUsers = data.filter((user) => user.id !== clientSocket.id);
  otherUsers.forEach((user) => {
    let targetUser = users.find((u) => u.id === user.id);
    if (!targetUser) {
      user.image = caniSrcs.find((img) => img.breed === user.breed).image;
      users.push(user);
      // console.log(user);
    } else {
      targetUser.posX = user.posX;
      targetUser.posY = user.posY;
    }
  });

  const updatedMe = data.find((element) => element.id === clientSocket.id);

  // console.log("user Display", updatedMe);

  if (!me) {
    me = updatedMe;
  } else {
    me = {
      ...me,
      posX: updatedMe.posX,
      posY: updatedMe.posY,
    };
  }

  calculateDistances(me, users); //una volta che riceve le informazioni di tutti gli utenti, calcolo la distanza tra me e tutti gli altri
});

clientSocket.on("userDisconnected", (data) => {
  // Handle user disconnection on client side
  users.filter((user) => data.find((u) => u.id == user.id));

  calculateDistances(me, users);
});

clientSocket.on("statoUpdate", (obj) => {
  console.log(obj);
  //update lo stato dello user in questione
  let targetUser = users.find((u) => u.id === obj.id);
  if (targetUser) {
    targetUser.stato = obj.stato;
    console.log(targetUser.stato);
  }
});

////////////////////////////////////////////////////////////////////////

//////////// GET POSITION AND SEND POSITION

function appendLocation(location) {
  lat = location.coords.latitude;
  long = location.coords.longitude;

  console.log("NEW LOCATION", {
    userId: id,
    posX: lat,
    posY: long,
  });

  clientSocket.emit("updateLocation", {
    userId: id,
    posX: lat,
    posY: long,
  });

  if (!mapExists && !initialPos) {
    ossiCreation(lat, long); //creo gli ossi

    sfondoCreation(lat, long); //creo lo sfondo
  }
}

// Initialize the previous position when the page loads
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function (location) {
    previousLat = location.coords.latitude;
    previousLong = location.coords.longitude;
    appendLocation(location);

    // console.log(location);
  });
  var watchId = navigator.geolocation.watchPosition(
    appendLocation,
    (error) => {
      console.log(error);
    },
    { maximumAge: 0, timeout: 3000, enableHighAccuracy: true }
  );
} else {
  target.innerText = "Geolocation API not supported.";
}

///////// DISTANCE CALCULATION
function calculateDistances(me, users) {
  users.forEach((user) => {
    if (!me?.posX || !me?.posY || !user?.posX || !user?.posY) return;
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

  const pixelRelativePos = worldToScreen(mRelativeX, mRelativeY); //chiamo la funzione che rimappa le coordinate rispetto al mondo

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
//SFONDO

function sfondoCreation(lat, long) {
  mapXDistance = -(pixelW * 710); //la distanza tra me e la mappa in pixel
  mapYDistance = -(pixelH * 745);
  // console.log(mapXDistance, mapYDistance);

  let mapDistance = screenToWorld(mapXDistance, mapYDistance);

  const angle = (Math.atan(mapDistance.x / mapDistance.y) * 180) / Math.PI; //calcolo l'angolo che riconverto in degree

  let mapDistanceIpo = Math.sqrt(
    //distanza calcolata come radice quadrata
    mapDistance.x * mapDistance.x + mapDistance.y * mapDistance.y
  );

  let mappaPoint = geolib.computeDestinationPoint(
    { latitude: lat, longitude: long },
    mapDistanceIpo,
    angle
  );

  console.log("creo la mappa", mappaPoint);

  clientSocket.emit("map", mappaPoint);
}

clientSocket.on("map", (value) => {
  map = value;
});

// //////////////////////////////////////////////////////////////////////////

// OSSI
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
  //CREO CNVCTN
  // creo il div che contiene la canva
  canvactn = createDiv();
  canvactn.class("canvactn");

  // CREO CTN
  createCanvas(windowWidth, windowHeight);
  canvactn.child(cnv);

  //funzione che al set up manda le informazioni prese dall'array al server

  cane = loadImage("assets/images/cani/" + user.breed.toUpperCase() + ".png"); //load dell'immagine del cane che sara associato a me
  caneSize(user.breed); //scrivo una funzione che calcola la dimensione in pixel del cane a seconda della razza

  //CREO LO SFONDO
  sfondo = createImg("assets/images/MAPPA_PROVVISORIA.png");
  sfondo.class("sfondo");
  sfondo.position(-(pixelW * 710), -(pixelH * 745)); //la distanza tra me e la mappa in pixel
  sfondo.size(pixelW * 1020, pixelH * 1400);
}

////////////////////////////////////////////////

function emit() {
  //che vengono mandate al server
  clientSocket.emit("userInfo", user);
}

////////////////////////////////////////////////

function draw() {
  clear(); //faccio il clear perchè senza un colore di sfondo succede un casino

  // PIXEL EFFECT NITIDO
  noSmooth();

  //VERIFICO CHE ESISTO
  if (me?.posX && me?.posY) {
    //Se esisto creo tutte le cose

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
    image(
      ombrina,
      windowWidth / 2 - caneSize(me.breed).width / 2 - pixelW,
      windowHeight / 2 + caneSize(me.breed).height / 2 - pixelH,
      caneSize(me.breed).width,
      3 * pixelH
    );

    image(
      cane, //cane che sono io
      windowWidth / 2 - caneSize(me.breed).width / 2, //al centro - la metà delle dimensioni del cane
      windowHeight / 2 - caneSize(me.breed).height / 2, //al centro - la metà delle dimensioni del cane
      caneSize(me.breed).width,
      caneSize(me.breed).height
    );

    push();
    //DISEGNO GLI UTENTI
    users.forEach((element) => {
      const size = caneSize(element.breed);

      image(
        ombrina,
        element.posX - size.width / 2 - pixelW,
        element.posY + size.height / 2 - pixelH,
        size.width,
        3 * pixelH
      );

      fill("#" + element.color);
      if (element.stato == true) {
        tint(255, 125);
      } else if (element.stato == false) {
        tint(255, 255);
      }

      image(
        element.image,
        element.posX - size.width / 2,
        element.posY - size.height / 2,
        size.width,
        size.height
      );
    });

    pop();
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

      if (d < ossoDistanceThreashold) {
        if (ossoFound == false) {
          ossoFound = true;
          ossoFoundF(osso);
        }
      }
    });
  }

  //ACCELEROMETRO
  // if (
  //   typeof DeviceMotionEvent.requestPermission === "function" &&
  //   typeof DeviceOrientationEvent.requestPermission === "function"
  // ) {
  //   // iOS 13+
  //   askButton = createButton("Permission");
  //   askButton.size((windowWidth * 6) / 8, windowHeight / 8);
  //   askButton.position(
  //     windowWidth / 2 - drumButton.width / 2,
  //     windowHeight / 2
  //   );
  //   askButton.mousePressed(() => {
  //     DeviceMotionEvent.requestPermission().then((response) => {
  //       if (response === "granted") {
  //         window.addEventListener("devicemotion", deviceMotionHandler, true);
  //       }
  //     });

  //     DeviceOrientationEvent.requestPermission()
  //       .then((response) => {
  //         if (response === "granted") {
  //           window.addEventListener(
  //             "deviceorientation",
  //             deviceTurnedHandler,
  //             true
  //           );
  //         }
  //       })
  //       .catch(console.error);
  //   });
  // }

  accX = round(accelerationX);
  accY = round(accelerationY);
  accZ = round(accelerationZ);
}

////////////////////////////////////////////////////////////////////////////

// MATCHING!

//SEND REQUEST
function mouseClicked() {
  users.forEach((element) => {
    // visto che la posizione dell'utente è nell'angolo a sinistra - calcolo il click sulla base della dimensione
    const size = caneSize(element.breed);
    if (
      mouseX >= element.posX - size.width / 2 &&
      mouseX <= element.posX + size.width / 2 &&
      mouseY >= element.posY - size.height / 2 &&
      mouseY <= element.posY + size.height / 2
    ) {
      if (element.stato == false) {
        // nascondo la ui
        dropdownMenu.classList.add("hidden");
        waggleGallery.classList.add("hidden");
        mappaDezoom.classList.add("hidden");
        //rendo visibile il div che conferma la mia volontà di fare waggle
        waggleDiv.classList.remove("hidden");
        waggleWarnTxt.innerHTML = "VUOI FARE WAGGLE CON " + element.name + "?";

        waggleImg.src =
          "assets/images/cani/" + element.breed.toUpperCase() + ".png";
        caneSize(element.breed);
        waggleImg.style.width = imgCane.width * 2 + "px";
        waggleImg.style.height = imgCane.height * 2 + "px";

        //WAGGLE BTN CLICK
        waggleBtn.addEventListener("click", () => {
          clientSocket.emit("statoUpdate", {
            id: clientSocket.id,
            stato: true,
          });
          // creo l'oggetto coi nomi e lo mando al server
          meAndYou = { sender: clientSocket.id, reciver: element.id };
          clientSocket.emit("chosenUser", meAndYou);

          // waggleDiv.style.height = pixelH * 140 + "px"; //il container diventa più grande
          // // compare il warning di attesa
          // waggleWarn.style.height = pixelH * 100 + "px";
          waggleWarnTxt.innerHTML =
            "ASPETTA CHE " + element.name + " ACCETTI LA RICHIESTA";
          waggleBtn.style.opacity = "0.5";
          waggleBtn.classList.add("btn-active");

          // countdown
          let nCount = 9;
          countdown.classList.remove("hidden");
          timer = setInterval(() => {
            if (nCount > -1) {
              countdown.innerHTML = nCount;
              nCount--;
            } else {
              clearInterval(timer);
              //nascondo il div
              waggleDiv.classList.add("hidden");

              //ricompare ui
              dropdownMenu.classList.remove("hidden");
              waggleGallery.classList.remove("hidden");
              mappaDezoom.classList.remove("hidden");
            }
          }, 1000);
        });

        //CLOSE CLICK
        closeWaggle.addEventListener("click", () => {
          clearInterval(timer);
          //nascondo il div
          waggleDiv.classList.add("hidden");
          //ricompare ui
          dropdownMenu.classList.remove("hidden");
          waggleGallery.classList.remove("hidden");
          mappaDezoom.classList.remove("hidden");
          clientSocket.emit("statoUpdate", {
            id: clientSocket.id,
            stato: false,
          });
        });
      }
    }
  });
}

//GET REQUEST
clientSocket.on("youGotChosen", (sender) => {
  clientSocket.emit("statoUpdate", { id: clientSocket.id, stato: true });
  console.log(`${sender} wants to waggle`);

  const you = users.find((element) => element.id == sender);

  waggleDiv.classList.remove("hidden");
  waggleWarnTxt.innerHTML = `${you.name} VUOLE FARE WAGGLE!`;

  waggleImg.src = `assets/images/cani/${you.breed.toUpperCase()}.png`;
  caneSize(you.breed);
  waggleImg.style.width = `${imgCane.width * 2}px`;
  waggleImg.style.height = `${imgCane.height * 2}px`;

  waggleBtn.classList.add("btn-active");
  countdown.classList.remove("hidden");

  const meAndYou = { reciver: clientSocket.id, sender: sender };
  // console.log(meAndYou);

  timer = setInterval(() => {
    if (nCount > -1) {
      countdown.innerHTML = nCount;
      nCount--;
    } else {
      clearInterval(timer);
      //nascondo il div
      waggleDiv.classList.add("hidden");
      //display ui
      dropdownMenu.classList.remove("hidden");
      waggleGallery.classList.remove("hidden");
      mappaDezoom.classList.remove("hidden");
      clientSocket.emit("statoUpdate", { id: clientSocket.id, stato: false });
    }
  }, 1000);

  // ACCETTO
  waggleBtn.addEventListener("click", () => {
    clientSocket.emit("accepted", meAndYou);

    clearInterval(timer);
    waggleDiv.classList.add("hidden");
  });

  //CLOSE CLICK
  closeWaggle.addEventListener("click", () => {
    clearInterval(timer);
    //nascondo il div
    waggleDiv.classList.add("hidden");
    //display ui
    dropdownMenu.classList.remove("hidden");
    waggleGallery.classList.remove("hidden");
    mappaDezoom.classList.remove("hidden");
    clientSocket.emit("statoUpdate", { id: clientSocket.id, stato: false });
  });
});

//SHAKE
clientSocket.on("startShake", (meAndYou) => {
  waggle.classList.remove("hidden"); // display waggle div

  console.log(meAndYou);
  const you = users.find(
    (element) => element.id == meAndYou.sender || element.id == meAndYou.reciver
  ); //trovo l'altro utente nell'array degli user

  if (you.id == meAndYou.sender) {
    meAndYouVar = {
      sender: meAndYou.sender,
      reciver: meAndYou.reciver,
      role: "sender",
    };
  } else if (you.id == meAndYou.reciver) {
    meAndYouVar = {
      sender: meAndYou.reciver,
      reciver: meAndYou.sender,
      role: "reciver",
    };
  }

  waggleMeImg.src = `assets/images/cani/${you.breed.toUpperCase()}.png`;
  canShake = true;
});

heart.addEventListener("click", () => {
  waggle.style.backgroundColor = "#298eff";

  heartImg.src = "assets/elements/HEART_ICON_PRESS.png";
  heartImg.style.height = `${pixelW * 14}px`;

  waggleTxt.style.color = "white";
  waggleTxt.innerHTML = "TIENI PREMUTO E SHAKERA PER FARE WAGGLE!";
});

function deviceShaken() {
  // console.log(meAndYouVar);
  // console.log(isPressing, canShake, isMatched);

  if (!isPressing && canShake && !isMatched) {
    console.log("waggle waggle");
    if (touches.length >= 1) {
      clientSocket.emit("shake", meAndYouVar);
      isPressing = true;
    }
  }
}

// ///////////////////
clientSocket.on("itsAMatch", (meAndYou) => {
  console.log(meAndYou);
  isMatched = true;

  let you;
  you = users.find((e) => e.id == meAndYou.reciver || e.id == meAndYou.sender);

  waggleAnimation(me, you, meAndYou.num);
});

function waggleAnimation(me, you, num) {
  waggleAnimationCtn.style.top = "-100%";
  waggleAnimationCtn.style.transition = "top 1s ease-in-out";

  heartImg.style.height = `${pixelW * 14}px`;
  // console.log(heartImg);
  // e lo animo - va al centro
  heart.style.top = `${(window.innerHeight - pixelH * 14) / 2}px`;
  heart.style.transition = "top 1s ease-in-out";
  // e lo animo - va in alto
  setTimeout(function () {
    // il cuoricino torna blu
    heartImg.src = "assets/elements/HEART_ICON.png";
    heart.style.top = `${pixelH * 36}px`;
    heart.style.transition = "top 1s ease-in-out";

    waggle.style.backgroundColor = "white";
    waggle.style.transition = "background-color 1s linear";

    if (!youAndme.find((elem) => elem.id === you.id || elem.id === me.id)) {
      youAndme.push(me, you);
    }
    // console.log(youAndme);

    youAndme.forEach((elem, i) => {
      let img = document.createElement("img");
      img.style.position = "absolute";
      img.style.bottom = `${pixelW * 90}px`;
      img.style.opacity = 1;

      img.src = `assets/images/cani/${elem.breed.toUpperCase()}.png`;
      caneSize(elem.breed);

      img.style.width = `${imgCane.width * 2}px`;
      img.style.height = `${imgCane.height * 2}px`;

      //  flippa il secondo utente
      if (elem.breed == you.breed) {
        img.style.transform = "scaleX(-1)";
      }

      img.classList.add("animation" + (i + 1));
      waggle.appendChild(img);

      youAndmeImg.push(img);
    });

    txtDone = document.createElement("div");
    // console.log(txtDone);
    txtDone.style.opacity = 1;
    txtDone.style.position = "absolute";
    txtDone.style.top = `${pixelH * 132}px`;
    txtDone.style.right = `${(window.innerWidth - wwwidth) / 2}px`;
    txtDone.style.width = `${wwwidth}px`;
    txtDone.classList.add("text", "txt-center");
    txtDone.innerHTML =
      "TU E " + you.name.toUpperCase() + "  AVETE FATTO WAGGLE";
    waggle.appendChild(txtDone);

    setTimeout(() => {
      // CREO LA CARD
      if (!cardCreated) {
        cardCreated = true;
        cardCreate(you, num); //funzione che crea la card

        // //////////////////////////////////
        // FUNZIONE DI CHIUSURA DI TUTTOOOOO
        waggle.addEventListener("click", function () {
          clearInterval(timer); //resetto il timer

          waggleBtn.style.opacity = "1";

          canShake = false; //entri nella modalità match
          isPressing = false; //controlla che tu stia premendo mentre faccio waggle
          isMatched = false;

          // Reset cardCreated flag when hiding waggle
          cardCreated = false;

          // countdown e btn request
          waggleBtn.classList.remove("btn-active");
          countdown.classList.add("hidden");
          countdown.innerHTML = "10";

          // nascondo il div di waggle
          waggle.classList.add("hidden");
          waggleDiv.classList.add("hidden");
          countdown.classList.add("hidden");
          heart.classList.remove("hidden");

          youAndme = [];
          youAndmeImg.forEach((img) => img.remove());
          youAndmeImg = [];

          // Clear user-specific variables
          meAndYou = {};
          meAndYouVar = {};
          me = null;
          you = null;

          // card
          card.remove();
          txtDone.remove();

          waggle.style.backgroundColor = "white";
          waggleTxt.innerHTML = "CLICCA IL CUORE PER FARE WAGGLE!";

          waggleAnimationCtn.style.top = `${pixelH * 50}px`;
          waggleAnimationCtn.style.left = `${
            (window.innerWidth - wwwidth) / 2
          }px`;
          heart.style.left = `${(window.innerWidth - pixelW * 15) / 2}px`;
          heart.style.top = `${pixelH * 130}px`;

          waggleWarnTxt.innerHTML = "";

          // reset della ui
          dropdownMenu.classList.remove("hidden");
          waggleGallery.classList.remove("hidden");
          mappaDezoom.classList.remove("hidden");

          clientSocket.emit("statoUpdate", {
            id: clientSocket.id,
            stato: false,
          });
        });
      }
    }, 2500);
  }, 1500);
}

// //////////////////////////////////////////////////////////////////

function cardCreate(you, num) {
  // console.log(num);
  youAndmeImg.forEach((elem) => {
    elem.remove();
  });
  txtDone.classList.add("hidden");
  heart.classList.add("hidden");

  // console.log(you);
  card = document.createElement("div");
  let imgCardSrc;

  you.num = num;

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

  // console.log(imgCardSrc);
  // Set the background image
  card.style.backgroundImage = `url(${imgCardSrc})`;
  card.style.backgroundSize = "cover"; // Optional: to ensure the background image covers the card
  card.style.position = "relative";
  card.style.top = `${(window.innerHeight - wwwidth * 1.625) / 2}px`;
  card.classList.add("animation3");
  card.style.zIndex = "200";
  card.style.width = wwwidth + "px";
  card.style.height = wwwidth * 1.625 + "px";
  card.style.textAlign = "left";

  card.style.imageRendering = "pixelated";

  card.classList.add("flex-col");
  card.style.justifyContent = "space-between";
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
  caneSize(you.breed);

  dogImg.style.width = imgCane.width * 2 + "px";
  dogImg.style.height = imgCane.height * 2 + "px";

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
  age.style.whiteSpace = "nowrap";
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
  // console.log(badgeOsso, badgeCuore);
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
  waggle.appendChild(card);
}

////////////////////////////////////////////////////////////////////////

// OSSI

//NEW OSSO CREATION
const messageForm = document.querySelector("#osso-message");
createOsso.addEventListener("click", () => {
  clientSocket.emit("statoUpdate", { id: clientSocket.id, stato: true });
});
messageForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form submission

  const message = messageForm.querySelector("textarea").value; // Correct the selector to textarea
  const osso = {
    posX: me.posX, // Ensure 'me' is properly defined
    posY: me.posY,
    contenuto: message,
    tipologia: "messaggio",
  };
  clientSocket.emit("statoUpdate", { id: clientSocket.id, stato: false }); // Ensure 'clientSocket' is properly defined and connected
  ossoDiv.classList.toggle("hidden");

  dropdownMenu.classList.toggle("hidden");
  waggleGallery.classList.toggle("hidden");
  mappaDezoom.classList.toggle("hidden");

  clientSocket.emit("newOsso", osso);
});

clientSocket.on("newOsso", (osso) => {
  ossi.push(osso);
  console.log("newosso ", osso);
});

//OSSO FOUND

let ossoMessageTxt;
let k = 0;
function ossoFoundF(message) {
  clientSocket.emit("statoUpdate", { id: clientSocket.id, stato: true });

  // Ensure ossoFoundDiv is shown and others are hidden
  ossoFoundDiv.classList.remove("hidden");
  dropdownMenu.classList.add("hidden");
  waggleGallery.classList.add("hidden");
  mappaDezoom.classList.add("hidden");
  // console.log(message);

  let apri = document.getElementById("apri");

  // Remove any existing event listeners before adding a new one
  let newApri = apri.cloneNode(true);
  apri.parentNode.replaceChild(newApri, apri);
  apri = newApri;

  apri.addEventListener("click", () => {
    if (k === 0) {
      // console.log(k);
      ossoFoundDiv.style.height = hhheight - pixelH * 19 + "px";

      //nascondo l'osso
      // Adjust ossoWarn dimensions
      ossoWarn.style.height = pixelH * 100 + "px";
      ossoWarn.style.width = 100 + "%";
      ossoWarn.style.padding = pixelH * 4 + "px";

      // Ensure ossoMessageTxt is available before using it
      ossoMessageTxt = document.getElementById("osso-message-txt");
      // console.log(ossoMessageTxt);

      if (message.tipologia === "messaggio") {
        closeFound.classList.add("hidden");
        ossoFoundDiv.style.height = pixelH * 125 + "px";
        ossoWarn.style.height = pixelH * 100 + "px";
        ossoImg.classList.add("hidden"); //l'immagine scompare
        // console.log(ossoImg);
        ossoMessageTxt.innerHTML = message.contenuto;
        ossoMessageTxt.style.width = "100%";
        // console.log(message.contenuto);
        apri.innerHTML = "OK";
        k = 1;
      } else if (message.tipologia === "guardaroba") {
        ossoImg.src = "assets/images/guardaroba/icone/" + message.contenuto;
        // console.log(message.contenuto);
        ossoMessageTxt.innerHTML = message.nome;
        ossoMessageTxt.style.width = "100%";
        apri.innerHTML = "OK";
        k = 1;
      }
    } else if (k === 1) {
      // console.log(k);
      ossoFoundDiv.style.height = pixelH * 100 + "px";
      ossoWarn.style.height = pixelH * 60 + "px";

      // Find and remove the specific osso

      let ossoToSplice = ossi.find((e) => e.contenuto === message.contenuto);
      ossi.splice(ossi.indexOf(ossoToSplice), 1);
      // console.log(ossoToSplice);
      // console.log(ossi);
      // console.log(message);

      // Add a random new osso
      let ossoToPush = ossiALL[Math.floor(Math.random() * ossiALL.length)];
      ossi.push(ossoToPush);
      // console.log(ossi);
      ossoFound = false;

      ossoImg.src = "assets/elements/OSSO_FOUND_ICON.png";
      ossoImg.classList.remove("hidden");
      closeFound.classList.remove("hidden");

      // Toggle visibility of elements
      dropdownMenu.classList.remove("hidden");
      waggleGallery.classList.remove("hidden");
      mappaDezoom.classList.remove("hidden");
      ossoFoundDiv.classList.add("hidden");

      clientSocket.emit("statoUpdate", { id: clientSocket.id, stato: false });

      // Reset variables and UI elements
      k = 0;
      ossoM.innerHTML = "";
      ossoM.value = "";
      ossoMessageTxt.innerHTML = "HAI TROVATO UN OSSO!";
    }
  });
}
closeFound.addEventListener("click", (event) => {
  event.preventDefault();
  // Toggle visibility of elements
  dropdownMenu.classList.remove("hidden");
  waggleGallery.classList.remove("hidden");
  mappaDezoom.classList.remove("hidden");

  clientSocket.emit("statoUpdate", { id: clientSocket.id, stato: false });
});

closeCreate.addEventListener("click", (event) => {
  event.preventDefault();
  // Toggle visibility of elements
  dropdownMenu.classList.remove("hidden");
  waggleGallery.classList.remove("hidden");
  mappaDezoom.classList.remove("hidden");

  clientSocket.emit("statoUpdate", { id: clientSocket.id, stato: false });
});

////////////////////////////////////////////////////////
function windowResized() {
  hhheight = windowHeight - 22 * pixelH;
  wwwidth = windowWidth * 0.46;
  resizeCanvas(windowWidth, windowHeight);
}

// //////////////////////////////////////////////////////////

//
function caneSize(cane) {
  //  "BASSOTTO", "COCKER","LEVRIERO", "DALMATA","ESKIMO", "Barboncino", "Golden", "Labrador", "Cavalier King",

  if (cane == razze[0]) {
    //"BASSOTTO"
    imgCane = { width: pixelW * 22, height: pixelH * 12 };
  } else if (cane == razze[1]) {
    //"COCKER"
    imgCane = { width: pixelW * 22, height: pixelH * 16 };
  } else if (cane == razze[2]) {
    //"LEVRIERO"
    imgCane = { width: pixelW * 24, height: pixelH * 20 };
  } else if (cane == razze[3]) {
    //"DALMATA"
    imgCane = { width: pixelW * 25, height: pixelH * 21 };
  } else if (cane == razze[4]) {
    //"ESKIMO"
    imgCane = { width: pixelW * 19, height: pixelH * 20 };
  } else if (cane == razze[5]) {
    //"Barboncino"
    imgCane = { width: pixelW * 17, height: pixelH * 17 };
  } else if (cane == razze[6]) {
    //"Golden"
    imgCane = { width: pixelW * 22, height: pixelH * 20 };
  } else if (cane == razze[7]) {
    //Labrador
    imgCane = { width: pixelW * 24, height: pixelH * 20 };
  } else if (cane == razze[8]) {
    //"Cavalier King"
    imgCane = { width: pixelW * 21, height: pixelH * 17 };
  }
  // console.log(imgCane);
  return imgCane;
  // }
}
