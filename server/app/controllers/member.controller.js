const db = require("../models");
const Member = db.members;
const Op = db.Sequelize.Op;

// Create and Save a new Member
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Member
  const member = {
    name: req.body.name,
    email: req.body.email,
    institution: req.body.institution,
    position: req.body.position,
    website: req.body.website,
    twitter: req.body.twitter,
    keywords: req.body.keywords,
  };

  // Save Member in the database
  Member.create(member)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Member.",
      });
    });
};

// Retrieve all Members from the database.
exports.findAll = (req, res) => {
  const keywords = req.query.keywords;
  var condition = keywords
    ? { keywords: { [Op.like]: `%${keywords}%` } }
    : null;

  Member.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving members.",
      });
    });
};

// Find a single Member with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Member.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Member with id=" + id,
      });
    });
};

// Update a Member by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Member.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Member was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Member with id=${id}. Maybe Member was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Member with id=" + id,
      });
    });
};

// Delete a Member with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Member.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Member was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Member with id=${id}. Maybe Member was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Member with id=" + id,
      });
    });
};

// Delete all Members from the database.
exports.deleteAll = (req, res) => {
  Member.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Members were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all members.",
      });
    });
};
