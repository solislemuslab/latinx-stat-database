module.exports = (sequelize, Sequelize) => {
  const Member = sequelize.define("member", {
    gid: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    institution: {
      type: Sequelize.STRING,
    },
    position: {
      type: Sequelize.STRING,
    },
    website: {
      type: Sequelize.STRING,
    },
    twitter: {
      type: Sequelize.STRING,
    },
    keywords: {
      type: Sequelize.STRING,
    },
    validated: {
      type: Sequelize.BOOLEAN,
    },
    approved: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Member;
};
