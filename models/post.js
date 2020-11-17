module.exports = (sequelize, DataTypes) => (
  sequelize.define('post', {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    writer: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  }, {
    timestamps: true,
    paranoid: true,
  })
);