require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { OAuth2Client } = require('google-auth-library'); // g
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // g

const app = express();

var corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

const users = []; // g

// g
function upsert(array, item) {
  const i = array.findIndex((_item) => _item.email === item.email);
  if (i > -1) array[i] = item;
  else array.push(item);
}

// g
app.post('/api/google-login', async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();
  upsert(users, { name, email, picture });
  res.status(201);
  res.json({ name, email, picture });
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the latinx-stat-database." });
});

require("./app/routes/member.routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
  
// Example
// const express = require('express');
// const dotenv = require('dotenv');
// const path = require('path');
// const { OAuth2Client } = require('google-auth-library');

// dotenv.config();
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// const app = express();
// app.use(express.json());

// const users = [];

// function upsert(array, item) {
//   const i = array.findIndex((_item) => _item.email === item.email);
//   if (i > -1) array[i] = item;
//   else array.push(item);
// }

// app.post('/api/google-login', async (req, res) => {
//   const { token } = req.body;
//   const ticket = await client.verifyIdToken({
//     idToken: token,
//     audience: process.env.CLIENT_ID,
//   });
//   const { name, email, picture } = ticket.getPayload();
//   upsert(users, { name, email, picture });
//   res.status(201);
//   res.json({ name, email, picture });
// });

// app.use(express.static(path.join(__dirname, '/build')));
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, '/build/index.html'))
// );

// app.listen(process.env.PORT || 8080, () => {
//   console.log(
//     `Server is ready at http://localhost:${process.env.PORT || 8080}`
//   );
// });
