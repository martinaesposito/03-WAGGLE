let ctn;
let ctnInput;
let inp;

let btnArray = [
  { text: "find your best buddy <3", link: "match.html" },
  { text: "🔙 home", link: "index.html" },
];
let inputFields = ["CANE", "PADRONE", "ETà", "bio"];

let btnCreateAvatar;

let capture;
let cnv;

let snapBtn;
let btnMatch;
let aMatch;

function setup() {
  // CONTAINER
  ctn = createDiv();
  ctn.class("ctn flex-col");

  // HOME BTN
  let btnHome = createDiv();
  let a = createA(btnArray[1].link, btnArray[1].text);
  btnHome.class("text btn");

  // INPUT CTN
  ctn.child(btnHome);
  btnHome.child(a);

  ctnInput = createDiv();
  ctnInput.id("ctn-input");
  ctnInput.class("flex-col");

  ctn.child(ctnInput);

  for (let i = 0; i < inputFields.length; i++) {
    let div = createDiv(inputFields[i]);
    div.class("text input-field flex-col");
    inp = createInput();
    inp.class(inputFields[i]);
    inp.class("border");

    ctnInput.child(div);
    div.child(inp);
  }

  // AVATAR CREATE
  btnCreateAvatar = createButton("FATTO");
  btnCreateAvatar.class("text btn");

  ctn.child(btnCreateAvatar);

  btnCreateAvatar.mousePressed(takePic);
}

// // BUTTON
// for (let i=0; i<btnArray.length; i++){
//     let btn= createDiv()
//     let a= createA(btnArray[i].link, btnArray[i].text);
//     btn.class("text btn");

//     ctn.child(btn);
//     btn.child(a);

// }

function takePic() {
  btnCreateAvatar.remove();

  capture = createCapture(VIDEO);

  capture.size(320, 240);
  capture.style("margin", "auto");
  ctn.child(capture);

  snapBtn = createButton("take a snap :)"); //create a button called "snap"
  snapBtn.class("text btn");
  ctn.child(snapBtn);
  snapBtn.mousePressed(takeSnap);
}

function takeSnap() {
  cnv = createCanvas(capture.width, capture.height);
  ctn.child(cnv);
  cnv.style("display", "block");

  image(capture, 0, 0, width, (width * capture.height) / capture.width);
  capture.hide();
  snapBtn.remove();

  //   btnMatch = createDiv();
  aMatch = createButton(btnArray[0].text);
  aMatch.class("text btn");
  //   ctn.child(btnMatch);
  ctn.child(aMatch);
  aMatch.mousePressed(() => {
    window.open("match.html", "_self");
  });
}

/// manca la parte dove se non ti piace la foto puoi tornare indietro e rifarla
