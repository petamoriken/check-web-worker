self.addEventListener("message", function(e) {
    const path = e.data.path;
    self.importScripts(path);
    self.postMessage(self.foo);
});
