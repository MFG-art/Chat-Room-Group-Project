module.exports = function(sequelize, DataTypes) {
  var Chat = sequelize.define("Chat", {
    username: DataTypes.STRING,
    message: DataTypes.STRING,
    time: DataTypes.DATE
  });

  return Chat;
};
