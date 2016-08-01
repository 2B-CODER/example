// extra-script-1.js

var alloc = function (ID, src) {
  imgs[ID] = new Image();
  imgs[ID].src = "variants/" + src.replace(/\.png$/, "") + ".png";
}