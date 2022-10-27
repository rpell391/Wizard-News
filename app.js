const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");

const timeAgo = require("node-time-ago");

// timeAgo(new Date()); // just now
// timeAgo(Date.now()); // just now
// timeAgo(new Date().toISOString()); // just now


// const routes = require("./routes");
const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  const posts = postBank.list();

  const html = `<!DOCTYPE html>
<html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css"/>
  </head>
  <body>
    <div class="newsList">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts
        .map(
          (post) => `
      <div class='newsItem'>
       <p>
        <span class="newsPosition">${post.id}. ▲</span><a href="/posts/${post.id}">${post.title}</a>
        <small>(by ${post.name}</small>
        </p> 
        <small class="newsInfo">
          ${post.upvotes} upvotes | ${timeAgo(post.date)}
        </small>
        </div>`
        )
        .join("")}
      </div>
    
  </body>
</html>;`;

  res.send(html);
});

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);
  if (!post.id) {
    res.status(404);
    const html = `<!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <header><img src="/logo.png"/>Wizard News</header>
      <div class="not-found">
        <p>Accio Page! 🧙‍♀️ ... Page Not Found</p>
        <img src="/dumbledore-404.gif"/>
      </div>
    </body>
    </html>`;
    res.send(html);
  } else {
    // const posts = postBank.list();
    res.send(
      `<!DOCTYPE html>
    <html>
      <head>
        <title>Wizard News</title>
        <link rel="stylesheet" href="/style.css"/>
      </head>
      <body>
        <div class="newsList">
          <header><img src="/logo.png"/>Wizard News</header>
          <div class='newsItem'>
           <p>
            <span class="newsPosition"></span>${post.title}
            <small>(by ${post.name}</small>
            </p> 
            <small class="newsInfo">
            ${timeAgo(post.date)}
            </small>
            <span>
             ${post.content}
            </span>
            </div>
          </div>
        
      </body>
    </html>;`
    );
  }
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
