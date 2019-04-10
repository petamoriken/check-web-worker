const workerPath = "worker.js";
const dirPath = location.origin + location.pathname.substr(0, location.pathname.lastIndexOf("/") + 1);

var worker;
var useBlob = false;
try {
  // Firefox, IE
  worker = new Worker(workerPath);
} catch (e) {
  // Chrome, Safari
  useBlob = true;
  const code = ['importScripts("' + dirPath + workerPath + '");'];
  const blob = new Blob(code, { type: "text/javascript" });
  const blobURL = URL.createObjectURL(blob);
  try {
    worker = new Worker(blobURL);
  } finally {
    URL.revokeObjectURL(blobURL);
  }
}

const path = useBlob ? dirPath + "data.js" : "data.js";
worker.postMessage({ path });

worker.addEventListener("message", function(e) {
  console.log(e.data);
});