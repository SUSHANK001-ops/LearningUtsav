const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url == "/about") {
    res.end("This is an about page");
  }
  if (req.url == "/profile") {
    res.end("This is an Profile page");
  }
  if (req.url == "/") {
    res.end("This is an home page");
  }
});

server.listen(5000);
