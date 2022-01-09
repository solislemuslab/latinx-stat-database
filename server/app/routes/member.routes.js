module.exports = (app) => {
  const members = require("../controllers/member.controller.js");

  var router = require("express").Router();

  // Create a new Member
  router.post("/", members.create);

  // Retrieve all Members
  router.get("/", members.findAll);

  // Retrieve a single Member with id
  router.get("/:id", members.findOne);

  // Update a Member with id
  router.put("/:id", members.update);

  // Delete a Member with id
  router.delete("/:id", members.delete);

  // Delete all Members
  router.delete("/", members.deleteAll);

  // router.post("/api/google-login", ) // figure this out

  app.use("/api/members", router);
};
