const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "TmpPwd_0",
  database: "LSD",
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const institution = req.body.institution;
  const position = req.body.position;
  const website = req.body.website;
  const twitter = req.body.twitter;
  const keywords = req.body.keywords;

  db.query(
    "INSERT INTO Members (Date_Created, Date_Modified, Name, Email, Institution, Position, Website, Twitter, Keywords) VALUES (?,?,?,?,?,?,?,?,?)",
    [
      new Date(),
      new Date().toISOString().slice(0, 19).replace("T", " "),
      name,
      email,
      institution,
      position,
      website,
      twitter,
      keywords,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/members", (req, res) => {
  db.query(
    "SELECT Id, Name, Email, Institution, Position, Website, Twitter, Keywords FROM Members",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/record", (req, res) => {
  const id = req.body.Id;
  db.query(
    "SELECT Id, Name, Email, Institution, Position, Website, Twitter, Keywords FROM Members WHERE Id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/update", (req, res) => {
  const id = req.body.Id;
  const institution = req.body.institution;
  db.query(
    "UPDATE Members SET Institution = ? WHERE Id = ?",
    [institution, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM Members WHERE Id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Your server is running on port 3001");
});
