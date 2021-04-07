// Adding libraries and necessary Modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

// Defining Global constants and variables
const homeStartingContent = "Welcome. This is your own journal. You can add notes or write about your Secrets :) Don't Worry, no one is watching. Happy writing!"
const aboutContent = "Writing our thoughts, feelings, and actions down in a journal allows us to craft and maintain our sense of self and solidifies our identity. It helps us reflect on our experiences and discover our authentic self. Keeping a journal can give you a chance to create and consider the narrative of your life, with all of the choices you have made and the memories that make you who you are today. In a word, the benefits of journaling on recovery is 'cathartic'."

let posts = [];

// Get requests for various pages
app.get("/", function(req, res) {
  res.render("home", {
    homeContent: homeStartingContent,
    posts: posts
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact");
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.get('/posts/:postName', function(req, res) {
  posts.forEach(function(post) {
    if (_.lowerCase(post.title) === _.lowerCase(req.params.postName)) {
      res.render("post", {
        postTitle: post.title,
        postBody: post.body
      });
    }
  });
});

// Post request for the Compose page
app.post("/compose", function(req, res) {
  const post = {
    title: req.body.postTitle,
    body: req.body.postBody
  };

  posts.push(post);
  res.redirect("/");
});

// Activating the server port at local host 3000
app.listen(process.env.PORT ||3000, function() {
  console.log("Server started on port 3000");
});
