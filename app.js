require("dotenv").config();
const createError = require("http-errors");
const path = require("path");
const db = require("./config/db");
const port = process.env.PORT || 3000;

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const flash = require("connect-flash");
//// const logger = require("morgan");
const flashMiddleware = require("./middleware/flash.middleware");

const indexRouter = require("./routes/index");

const app = express();

//// Hot reload
if (process.env.NODE_ENV === "dev") {
  const livereload = require("livereload");
  const connectLiveReload = require("connect-livereload");

  const liveReloadServer = livereload.createServer();
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });

  app.use(connectLiveReload());
}

//handle sessions
app.use(
  session({
    name: "Auth",
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 90,
    },
    store: mongoStore.create(
      {
        mongoUrl: process.env.MONGO_URL,
        autoRemove: "disabled",
      },
      (err) => {
        console.log("Error in the mongo Store", err);
      }
    ),
  })
);

//serving the static files
app.use(express.static(path.join(__dirname, "public")));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);

//// app.use(logger("dev"));
//to convert json payload into javascript object
app.use(express.json());
//for parsing the form data into urlencoded format
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// flash
app.use(flash());
app.use(flashMiddleware.notification);

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  req.url;
  // render the error page
  res.status(err.status || 500);
  res.render("error", { title: "Error", err: err.message, path: req.path });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
