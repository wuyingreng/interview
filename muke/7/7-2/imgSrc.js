console.log("start");
let img = document.createElement("img");
// img.src触发onload事件,等加载完成才会打印loaded
img.onload = function () {
  console.log("loaded");
};

img.src =
  "https://img.xueba5.com/images/d0/eb/8f92d88a666c06917f557737ca73ab0a15c1ebd0.png";
console.log("end");