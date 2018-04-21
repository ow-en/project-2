let express = require("express");
let bodyParser = require("body-parser");
let dbu = require("./auth");
let db = require("./models");
let passport = require("passport");

let PORT = process.env.PORT || 3000;

let app = express();

app.use(express.static("public"));
app.use(require("morgan")("combined"));
app.use(require("cookie-parser")());
app.use(
  require("body-parser").urlencoded({
    extended: true
  })
);
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
  })
);


app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");


let routes = require("./controllers/controller.js");
app.use("/", routes);

db.sequelize
  .sync({
    force: false
  })
  .then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });
