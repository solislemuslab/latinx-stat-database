module.exports = (app) => {
  const members = require("../controllers/member.controller.js");

  var router = require("express").Router();

  // Create a new Member
  router.post("/", members.create);

  // Retrieve all Members
  router.get("/", members.findAll);

  // Retrieve a single Member with gid
  router.get("/:gid", members.findOne);

  // Update a Member with gid
  router.put("/:gid", members.update);

  // Delete a Member with gid
  router.delete("/:gid", members.delete);

  app.use("/api/members", router);
};
