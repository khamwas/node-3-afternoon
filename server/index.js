require("dotenv").config();
const express = require("express"),
  { json } = require("body-parser"),
  session = require("express-session"),
  cors = require("cors"),
  checkForSession = require("./middlewares/checkForSession"),
  { read } = require("../server/controllers/swag_controller"),
  ac = require("./controllers/auth_controller"),
  cc = require("./controllers/cart_controller"),
  sc = require("../server/controllers/search_controller");
port = process.env.SERVER_PORT || 3000;

var app = express();
app.use(json());
app.use(cors());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000000
    }
  })
);
app.use(checkForSession);

app.get("/api/swag", read);
app.post("/api/login", ac.login);
app.post("/api/register", ac.register);
app.post("/api/signout", ac.signout);
app.get("/api/user", ac.getUser);

app.post("/api/cart", cc.add);
app.post("/api/cart/checkout", cc.checkout);
app.delete("/api/cart", cc.delete);

app.get("/api/search", sc.search);

app.listen(port, () => {
  console.log(`Port ${port} is listening...`);
});
