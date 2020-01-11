module.exports = function(sequelize, DataTypes) {
  var Chat = sequelize.define("Chat", {
    message: DataTypes.STRING
  });
  Chat.associate = function(models) {
    // Associating Band with Songs
    // When an Band is deleted, also delete any associated Songs
    Chat.belongsTo(models.Users, {
      onDelete: "cascade"
    });
  };
  return Chat;
};
