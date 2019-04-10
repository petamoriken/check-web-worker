const worker = new Worker("worker.js");

worker.addEventListener("message", function(e) {
    console.log(e.data);
});