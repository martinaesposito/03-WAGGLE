/ /; /////////////////////////////////////////////////////////////////////////

//SEZIONI OPTIONS
let aspetto = document.getElementById("aspetto-options");
let info = document.getElementById("info-options");
let sezioniOptions = document.getElementsByClassName("sezioni-options");

//SEZIONI BUTTON IN ALTO
let sezioni = document.getElementsByClassName("sezioni");
console.log(sezioni);
sezioni.forEach((s) => {
  s.addEventListener("click", () => {
    console.log(s);

    if (s == sezioni[1]) {
      //VISUALIZZO ASPETTO
      sezioni[0].classList.add("unselected");
      sezioni[0].classList.remove("selected-right");
      sezioniOptions[1].classList.remove("hidden");

      sezioni[1].classList.add("selected-left");
      sezioni[1].classList.remove("unselected");
      sezioniOptions[0].classList.add("hidden");
    } else if (s == sezioni[0]) {
      //VISUALIZZO INFO
      sezioni[1].classList.add("unselected");
      sezioni[1].classList.remove("selected-left");
      sezioniOptions[0].classList.remove("hidden");

      sezioni[0].classList.add("selected-right");
      sezioni[0].classList.remove("unselected");
      sezioniOptions[1].classList.add("hidden");
    }
  });
});

////////// INFO
// INPUTS
let inputs = document.querySelectorAll("input");
inputs.forEach(function (e) {
  e.required = true;
  e.autocomplete = "off";

  e.addEventListener("focusout", () => {
    console.log(e);
    if (e.value == "") {
      e.classList.add("invalid");
    } else e.classList.remove("invalid");
  });
  //
});

// TEXT AREA
let txtA = document.getElementById("bio");
txtA.addEventListener("focusout", () => {
  console.log(txtA.checkValidity());
  if (txtA.checkValidity() == false) {
    txtA.classList.add("invalid");
  } else txtA.classList.remove("invalid");
});

////////// ASPETTO
// PREVIEW
let preview = document.getElementById("preview");
preview.style.height = pixelH * 50 + "px";
// img preview
let imgPreview = document.getElementById("img-preview");
imgPreview.style.width = pixelW * 41 + "px";

//OPT-CONTAINER
let optCtn = document.getElementsByClassName("opt-container"); //bottoncini option

//SELECT
let select = document.getElementById("razza");

// let cani = [
//   //Array di array per le razze di cani
//   [
//     "Bassotto",
//     "Barboncino",
//     "Cavalier King",
//     "Yorkshire Terrier",
//     "Papillon",
//     "Chihuahua",
//   ], //S
//   ["Carlino", "Beagle", "Cocker", "Chin"], //M
//   ["Dalmata", "Levriero", "Labrador", "Golden", "Eskimo", "Weimarainer"],
// ]; //L
let cani = [
  //Array di array per le razze di cani
  ["Bassotto", "Cocker", "Barboncino", "Cavalier King"], //S
  ["Levriero", "Labrador", "Golden"], //M
  ["Dalmata", "Eskimo"],
]; //L

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

// ETA
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

// Size buttons
let size = ["S", "M", "L"];
let sizeBtn = [];
for (let i = 0; i < size.length; i++) {
  let b = document.createElement("button");
  b.classList.add("size");
  b.classList.add("text");
  b.id = size[i];
  b.innerHTML = size[i];
  b.style.backgroundColor = size[i];
  optCtn[1].appendChild(b);

  sizeBtn.push(b);
}

// se clicco sul select ma nessuna taglia è stata scelta i bottoni si colorano di rosso e la lista è disattivata
select.addEventListener("focus", () => {
  console.log("it's me");
  if (!isSizeActive()) {
    select.classList.add("invalid");

    sizeBtn.forEach((button) => {
      button.classList.add("invalid");
    });
  } else {
    select.classList.remove("invalid");
    sizeBtn.forEach((button) => {
      button.classList.remove("invalid");
    });
  }
});

function isSizeActive() {
  // Function to check if a size button is active
  return sizeBtn.some((button) => button.classList.contains("btn-active"));
}

// Event listener for select element
select.addEventListener("change", (event) => {
  let allCaps = event.target.value.toUpperCase();
  console.log(event.target.value);
  imgPreview.src = "assets/images/cani/" + allCaps + ".png";
  caneSize(allCaps);
  console.log(imgCane);
  imgPreview.style.width = imgCane.width + "px";
  imgPreview.style.height = imgCane.height + "px";
});

// Color buttons
let cooolors = ["95C623", "B897FF", "F75247", "FF8D23", "FF9BEF"];
let coolorsBtn = [];
for (let i = 0; i < cooolors.length; i++) {
  let b = document.createElement("button");
  b.classList.add("color-btn");
  b.style.backgroundColor = "#" + cooolors[i];
  b.id = cooolors[i];
  coolorsBtn.push(b);
  optCtn[2].appendChild(b);
}
// eta
let eta = document.getElementById("eta");
eta.placeholder = arrayEta[0];
// Set the value to an empty string

arrayEta.forEach((e) => {
  let o = document.createElement("option");
  o.value = e;
  o.innerHTML = e;
  o.classList.add("text");
  eta.appendChild(o);
});

eta.value = ""; // Set initial value to empty string after all options are appended

eta.addEventListener("focusout", (event) => {
  if (eta.value == "") {
    eta.classList.add("invalid");
  } else {
    eta.classList.remove("invalid");
  }
});

eta.addEventListener("change", (event) => {
  const selectedIndex = eta.selectedIndex;
  const selectedValue = eta.options[selectedIndex].value;
  console.log(selectedValue);
  eta.value = selectedValue;
  console.log(eta);
});

//sesso btn
let sesso = ["M", "F"];
let sessoBtn = [];
let sessoImg;

for (let i = 0; i < sesso.length; i++) {
  let b = document.createElement("button");
  b.classList.add("sesso-btn");
  b.classList.add("text", "sesso-btn");
  b.id = sesso[i];

  sessoImg = document.createElement("img");
  sessoImg.src = "assets/elements/card/" + sesso[i] + ".png";
  sessoImg.style.height = 8 * pixelH + "px";

  b.appendChild(sessoImg);
  optCtn[0].appendChild(b);

  sessoBtn.push(b);
}

// //////////////////////////////////////////////////////////////////////////

let sessoC;
let sizeC;
let colC;

// Input button event listeners
let button = document.querySelectorAll("button");
button.forEach(function (e) {
  e.classList.add("btn");

  e.addEventListener("click", (event) => {
    event.preventDefault();

    if (e.classList.contains("size")) {
      sizeBtn.forEach(function (j) {
        if (j.classList.contains("btn-active")) {
          j.classList.remove("btn-active");
        }
        j.style.borderColor = "black";
        j.style.color = "black";
      });
      select.style.borderColor = "black";

      sizeC = e.id;

      let i = sizeBtn.indexOf(e);
      let array = cani[i];
      console.log(array);

      let opts = document.querySelectorAll(".sizeoptions");
      opts.forEach(function (o) {
        o.remove();
      });

      for (let i = 0; i < array.length; i++) {
        let c = document.createElement("option");
        c.classList.add("text");
        c.classList.add("sizeoptions");
        c.innerHTML = array[i];
        select.appendChild(c);
        // let doggo = array[i].toUpperCase();

        imgPreview.src =
          "assets/images/cani/" + array[0].toUpperCase() + ".png";
        caneSize(array[0].toUpperCase());
        imgPreview.style.width = imgCane.width + "px";
        imgPreview.style.height = imgCane.height + "px";

        select.disabled = false;
        select.placeholder = array[0];
        select.disabled = false;
      }
    } else if (e.classList.contains("color-btn")) {
      coolorsBtn.forEach(function (k) {
        if (k.classList.contains("btn-active")) {
          k.classList.remove("btn-active");
        }
        k.style.borderColor = "black";
        colC = e.id;
      });
    } else if (e.classList.contains("sesso-btn")) {
      sessoBtn.forEach(function (h) {
        if (h.classList.contains("btn-active")) {
          h.classList.remove("btn-active");
        }
        h.style.borderColor = "black";
        sessoC = e.id;
      });
    }

    e.classList.add("btn-active");
    console.log(e);
  });
});

// //////////////////////////////////////////////////////////////////////////

//l'oggetto che salverò nello storage
let data = {
  owner: "",
  name: "",
  age: "",
  sesso: "",
  bio: "",
  size: "",
  breed: "",
  color: "",
};

// OK
let ok = document.getElementById("ok");
ok.style.marginBottom = "0";

ok.addEventListener("click", function () {
  console.log("ok");

  // PRIMA FA UN CHECK DEI BOTTONI

  //ETA
  if (eta.value == "") {
    eta.classList.add("invalid");
  } else {
    eta.classList.remove("invalid");
  }

  // Check if at least one TAGLIA button has the class btn-active
  let isTagliaActive = sizeBtn.some(function (j) {
    return j.classList.contains("btn-active");
  });
  // Set border colors for size buttons
  sizeBtn.forEach(function (j) {
    j.style.borderColor = isTagliaActive ? "black" : "red";
    console.log(isTagliaActive);
  });
  // razza
  console.log(razza.checkValidity());
  if (razza.checkValidity() == false) {
    razza.classList.add("invalid");
  }

  // Check if at least one sesso button has the class btn-active
  let isSessoActive = sessoBtn.some(function (j) {
    return j.classList.contains("btn-active");
  });
  // Set border colors for sesso buttons
  sessoBtn.forEach(function (j) {
    j.style.borderColor = isSessoActive ? "black" : "red";
    console.log("sesso" + isSessoActive);
  });

  // Check if at least one color button has the class btn-active
  let isColorActive = coolorsBtn.some(function (i) {
    return i.classList.contains("btn-active");
  });
  // Set border colors for color buttons
  coolorsBtn.forEach(function (i) {
    i.style.borderColor = isColorActive ? "black" : "red";
    console.log(isColorActive);
  });

  // BIO
  var form = document.getElementById("form");
  console.log(form.checkValidity(), txtA.checkValidity());

  if (form.checkValidity() == false) {
    var list = form.querySelectorAll(":invalid");
    for (var item of list) {
      console.log(item);
      item.classList.add("invalid");
    }
  }

  if (txtA.checkValidity() == false) {
    txtA.classList.add("invalid");
  }

  if (
    form.checkValidity() == true &&
    txtA.checkValidity() == true &&
    razza.checkValidity() == true &&
    isColorActive == true &&
    isTagliaActive == true &&
    isSessoActive == true &&
    true
  ) {
    console.log(document.getElementById("umano").value);
    console.log(document.getElementById("cane").value);
    console.log(document.getElementById("eta").value);
    console.log(sessoC);
    console.log(document.getElementById("bio").value);
    console.log(sizeC);
    console.log(document.getElementById("razza").value);
    console.log(colC);

    data = {
      owner: document.getElementById("umano").value,
      name: document.getElementById("cane").value,
      age: document.getElementById("eta").value,
      sesso: sessoC,
      bio: document.getElementById("bio").value,
      size: sizeC,
      breed: document.getElementById("razza").value,
      color: colC,
    };

    sessionStorage.setItem(data.owner + "-" + data.name, JSON.stringify(data)); // Storing data as JSON string
    console.log(sessionStorage.getItem(data.owner + "-" + data.name));
    console.log(sessionStorage);

    // for (const property in data) {
    //   // console.log(`${property}: ${data[property]}`);
    //   if (`${data[property]}` == "" || undefined) {
    //     console.log(`${data[property]}` + " error!");
    //   } }
    // //////////////////////////////////////////////////////////////////
    window.open(
      "card.html" + "?key=" + data.owner + "-" + data.name + "&page=form",
      "_self"
    );
  } else console.log("some data is still missing");
});

function caneSize(cane) {
  //  "BASSOTTO", "COCKER","LEVRIERO", "DALMATA","ESKIMO", "Barboncino", "Golden", "Labrador", "Cavalier King",

  if (cane == razze[0].toUpperCase()) {
    //"BASSOTTO"
    imgCane = { width: pixelW * 22 * 2, height: pixelH * 2 * 12 };
  } else if (cane == razze[1].toUpperCase()) {
    //"COCKER"
    imgCane = { width: pixelW * 22 * 2, height: pixelH * 2 * 16 };
  } else if (cane == razze[2].toUpperCase()) {
    //"LEVRIERO"
    imgCane = { width: pixelW * 24 * 2, height: pixelH * 2 * 20 };
  } else if (cane == razze[3].toUpperCase()) {
    //"DALMATA"
    imgCane = { width: pixelW * 25 * 2, height: pixelH * 2 * 21 };
  } else if (cane == razze[4].toUpperCase()) {
    //"ESKIMO"
    imgCane = { width: pixelW * 19 * 2, height: pixelH * 2 * 20 };
  } else if (cane == razze[5].toUpperCase()) {
    //"Barboncino"
    imgCane = { width: pixelW * 17 * 2, height: pixelH * 2 * 17 };
  } else if (cane == razze[6].toUpperCase()) {
    //"Golden"
    imgCane = { width: pixelW * 22 * 2, height: pixelH * 2 * 20 };
  } else if (cane == razze[7].toUpperCase()) {
    //Labrador
    imgCane = { width: pixelW * 24 * 2, height: pixelH * 2 * 20 };
  } else if (cane == razze[8].toUpperCase()) {
    //"Cavalier King"
    imgCane = { width: pixelW * 21 * 2, height: pixelH * 2 * 17 };
  }
  return imgCane;
  // }
}
