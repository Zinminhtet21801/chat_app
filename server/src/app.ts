import * as express from "express";
const app = express();
const http = require("http");

const { v4: uuid } = require("uuid");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect(`/${uuid()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

app.get("/", (req: express.Request, res: express.Response) => {
  res.redirect(`/${uuid()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});



module.exports = app;
