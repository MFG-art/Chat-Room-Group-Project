module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING
  });
  Users.associate = function (models) {
    // Associating Band with Songs
    // When an Band is deleted, also delete any associated Songs
    Users.hasMany(models.Chat, {
      onDelete: "cascade"
    });
  };
  return Users;
};
