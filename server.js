//AVVIAMENTO DEL SERVER

let express = require("express"); // load express
let app = express();

let port = process.env.PORT || 3000; // define the port where client files will be provided

let server = app.listen(port); // start to listen to that port
console.log("running server on http://localhost:" + port);

app.use(express.static("public")); // provide static access to the files in the "public" folder

let serverSocket = require("socket.io"); // load socket library

let io = serverSocket(server); // create a socket connection

const geolib = require("geolib"); //library per calcolare la distanza tra due punti

///////////////////////////////////

class User {
  constructor(id, userInfo) {
    this.id = id; //id dell'utente che mi serve per il match e per verificare stato di connessione e disconnessione
    this.userInfo = userInfo; // in questa variabile conservo tutte le info legate al cane
  }
}

var users = [];

let matchingUsers = [];
let me;
let you;

//verifico l'esistenza della mappa
let mapExists = false;
let map;

///////////////////////////////////

// define which function should be called  when a new connection is opened from client
io.on("connection", newConnection);

function newConnection(newSocket) {
  // callback function on new connection

  // Send the existing map to the new user if it exists
  if (mapExists == true) {
    console.log("mappa esiste già");
    newSocket.emit("mapExists", map);
  } else if (mapExists == false) {
    newSocket.on("map", (newMap) => {
      map = newMap;
      console.log("creo la mappa");
      mapExists = true;
      io.emit("map", map); // Broadcast the map to all clients
    });
  }

  newSocket.on("userInfo", (data) => {
    let newUser = new User(newSocket.id, data);
    users.push(newUser);

    console.log("users", users);
  });

  newSocket.on("updateLocation", (data) => {
    const { userId, posX, posY } = data;
    // Find the user object by ID
    const userToUpdate = users.find((user) => user.id === userId);
    console.log(users);
    if (!userToUpdate) return;
    console.log(userToUpdate.userInfo.posX, userToUpdate.userInfo.posY);
    // console.log("User to update:", userToUpdate);
    // Update the user's position
    // userToUpdate.userPos = { posX, posY };
    userToUpdate.userInfo.posX = posX;
    userToUpdate.userInfo.posY = posY;

    // Broadcast the updated user list to all clients

    io.emit(
      "userDisplay",
      users.map((user) => ({
        ...user.userInfo,
        id: user.id,
      }))
    );
  });

  newSocket.on("disconnect", () => {
    //se un utente si disconnette
    users = users.filter((user) => user.id !== newSocket.id);
    io.emit(
      "userDisconnected",
      users.map((user) => ({ ...user.userInfo, id: user.id }))
    ); // Broadcast the updated user list (without socket IDs) to all clients
  });

  newSocket.on("chosenUser", (meAndYou) => {
    // quando faccio shake con il dispositivo viene inviato dal client il messaggio shake che avvisa che voglio fare match

    let sender = meAndYou.sender;
    let reciver = meAndYou.reciver;

    io.to(reciver).emit("youGotChosen", sender);
  });

  newSocket.on("accepted", (meAndYou) => {
    // quando faccio shake con il dispositivo viene inviato dal client il messaggio shake che avvisa che voglio fare match
    console.log("accepted");

    reciver = meAndYou.reciver;
    sender = meAndYou.sender;

    io.to(reciver).emit("startShake", meAndYou);
    io.to(sender).emit("startShake", meAndYou);
  });

  newSocket.on("shake", (meAndYou) => {
    console.log("shake");
    if (
      !matchingUsers.find(
        (user) =>
          user.sender === meAndYou.sender && user.reciver === meAndYou.reciver
      )
    ) {
      matchingUsers.push(meAndYou);
      console.log("user pushed");
    }

    let otherUser = matchingUsers.find(
      (user) =>
        user.sender === meAndYou.reciver && user.reciver === meAndYou.sender
    );

    if (otherUser) {
      console.log("anche l'altro utente - attivo il matching");
      matchingUsers.forEach((e) => {
        if (
          (e.sender === meAndYou.sender && e.reciver === meAndYou.reciver) ||
          (e.reciver === meAndYou.sender && e.sender === meAndYou.reciver)
        ) {
          meAndYou.num = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
          // console.log("num ", meAndYou.num);
          io.to(e.sender).emit("itsAMatch", meAndYou);
          io.to(e.reciver).emit("itsAMatch", meAndYou);
        }
      });

      matchingUsers = matchingUsers.filter(
        (e) =>
          !(e.sender === meAndYou.sender && e.reciver === meAndYou.reciver) &&
          !(e.reciver === meAndYou.sender && e.sender === meAndYou.reciver)
      );
      console.log("matching concluded");
    }
  });

  // creo un nuovo osso
  newSocket.on("newOsso", (osso) => newSocket.broadcast.emit("newOsso", osso));

  // disattivo la possivilità di fare waggle se già lo sto facendo o se trovo un osso
  newSocket.on("statoUpdate", (obj) => {
    userToUpdate = users.find((e) => e.id === obj.id);
    // console.log("userToUpdate ", userToUpdate);
    // console.log("stato ", obj.stato);

    if (userToUpdate) {
      userToUpdate.userInfo.stato = obj.stato;
      // console.log(userToUpdate);

      io.emit("statoUpdate", { id: userToUpdate.id, stato: obj.stato });
    }
  });
}

//   newSocket.on("shake", (meAndYou) => {
//     const me = meAndYou.sender;
//     const you = meAndYou.reciver;
//     console.log("134  ");
//     console.log(meAndYou);

//     let otherUser;

//     if (
//       !matchingUsers.find((user) => user.sender == me && user.reciver == you)
//     ) {
//       matchingUsers.push({ sender: me, reciver: you, ruolo: meAndYou.ruolo });
//       otherUser = matchingUsers.find(
//         (user) => user.reciver === you && user.sender === me
//       );
//       console.log("otherUser:", otherUser);
//     } else if (
//       !matchingUsers.find((user) => user.reciver == me && user.sender == you)
//     ) {
//       matchingUsers.push({ reciver: me, sender: you, ruolo: meAndYou.ruolo });
//       otherUser = matchingUsers.find(
//         (user) => user.sender === you && user.reciver === me
//       );
//     } else {
//       console.log(matchingUsers);
//     }

//     console.log("Current matchingUsers:", matchingUsers);

//     if (otherUser) {
//       console.log("otherUser exists");

//       matchingUsers.forEach((e) => {
//         if (
//           (e.sender === me && e.reciver === you) ||
//           (e.reciver === me && e.sender === you)
//         ) {
//           console.log(e.ruolo);
//           console.log("About to send itsAMatch message");

//           const matchData = {
//             sender: meAndYou.sender,
//             reciver: meAndYou.reciver,
//             ruolo: meAndYou.ruolo,
//           };

//           io.to(e.sender).emit("itsAMatch", matchData);
//           io.to(e.reciver).emit("itsAMatch", matchData);
//         }
//       });

//       matchingUsers = matchingUsers.filter(
//         (e) =>
//           !(e.sender === me && e.reciver === you) &&
//           !(e.sender === you && e.reciver === me)
//       );
//       console.log("Updated matchingUsers:", matchingUsers);
//     } else {
//       console.log("error");

//       // DA TOGLIEREEEE //////////////////////////////////////////////////////////////////

//       const otherUser = { sender: me, reciver: you, ruolo: meAndYou.ruolo };
//       matchingUsers.push(otherUser);

//       matchingUsers.forEach((e) => {
//         if (
//           (e.sender === me && e.reciver === you) ||
//           (e.reciver === me && e.sender === you)
//         ) {
//           console.log(e.ruolo);
//           console.log("About to send itsAMatch message");

//           const matchData = {
//             sender: meAndYou.sender,
//             reciver: meAndYou.reciver,
//             ruolo: meAndYou.ruolo,
//           };
//           io.to(e.sender).emit("itsAMatch", matchData);
//           io.to(e.reciver).emit("itsAMatch", matchData);
//         }
//       });
//     }
//   });

//   newSocket.on("newOsso", (osso) => io.emit("newOsso", osso));
// }
