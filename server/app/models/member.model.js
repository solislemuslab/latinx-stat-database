module.exports = (sequelize, Sequelize) => {
  const Member = sequelize.define("member", {
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
  });

  return Member;
};
