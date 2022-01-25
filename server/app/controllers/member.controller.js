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
    gid: req.body.gid,
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
    ? { keywords: { [Op.like]: `%${keywords}%` }, visible: true }
    : { visible: true };
  Member.findAll({
    where: condition,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving members.",
      });
    });
};

// Find a single Member with a gid
exports.findOne = (req, res) => {
  const gid = req.params.gid;
  Member.findOne({ where: { gid: gid } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Member with gid=" + gid,
      });
    });
};

// Update a Member by the gid in the request
exports.update = (req, res) => {
  const gid = req.params.gid;

  Member.update(req.body, {
    where: { gid: gid },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Member was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Member with gid=${gid}. Maybe Member was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Member with gid=" + gid,
      });
    });
};

// Delete a Member with the specified gid in the request
exports.delete = (req, res) => {
  const gid = req.params.gid;

  Member.destroy({
    where: { gid: gid },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Member was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Member with gid=${gid}. Maybe Member was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Member with gid=" + gid,
      });
    });
};

// Delete all Members from the database. // DANGEROUS
// exports.deleteAll = (req, res) => {
//   Member.destroy({
//     where: {},
//     truncate: false,
//   })
//     .then((nums) => {
//       res.send({ message: `${nums} Members were deleted successfully!` });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all members.",
//       });
//     });
// };
