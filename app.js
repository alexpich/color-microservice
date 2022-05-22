var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const PORT = process.env.PORT || 4000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**********************************
              ROUTES
***********************************/

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

// GET - COLORS
app.post("/", function (req, res) {
  // console.log(req.body);
  const midpoint = 0.5;
  let colorA = req.body.colorA;
  let colorB = req.body.colorB;
  const [rA, gA, bA] = colorA.match(/\w\w/g).map((c) => parseInt(c, 16));
  const [rB, gB, bB] = colorB.match(/\w\w/g).map((c) => parseInt(c, 16));
  const r = Math.round(rA + (rB - rA) * midpoint)
    .toString(16)
    .padStart(2, "0");
  const g = Math.round(gA + (gB - gA) * midpoint)
    .toString(16)
    .padStart(2, "0");
  const b = Math.round(bA + (bB - bA) * midpoint)
    .toString(16)
    .padStart(2, "0");

  // let newColor = "#" + r + g + b;
  // let data = { colorC: newColor };
  // console.log(data);
  // res.json(data);
  let newColor = "#" + r + g + b;
  console.log(newColor);
  res.json(newColor);
});

app.listen(PORT, function () {
  console.log(
    "Express started on http://localhost:" +
      PORT +
      "; press Ctrl-C to terminate."
  );
});
