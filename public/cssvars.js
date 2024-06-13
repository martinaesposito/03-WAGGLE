//PROPORZIONI DELLO SCHERMO
let hhheight = window.innerHeight - 22 * (window.innerHeight / 172);
let wwwidth = hhheight * 0.46;
let htmlHeight = window.innerHeight;

let pixelW = wwwidth / 80;
let pixelH = hhheight / 172;

document.documentElement.style.setProperty("--hhheight", hhheight + "px");
document.documentElement.style.setProperty("--wwwidth", wwwidth + "px");
document.documentElement.style.setProperty("--html-height", htmlHeight + "px");
