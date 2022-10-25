const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");

// const routes = require("./routes");
const app = express();

app.use('/static', express.static('public'));
// app.use(routes);
app.use(morgan("dev"));
app.get("/", (req, res) => {
  
const posts = postBank.list();

const html = `<!DOCTYPE html>
<html>
  <head>
    <title>Wizard News</title>
  </head>
  <body>
    <ul>
      ${posts.map(post => `<li>${post.title}</li>`)}
    </ul>
  </body>
</html>`;


res.send(html)
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
