module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  });
  Users.associate = function(models) {
    // Associating users with chat messages
    // When an useris deleted, also delete any associated messages
    Users.hasMany(models.Chat, {
      onDelete: "cascade"
    });
  };
  Users.prototype.validPassword = function(password) {
    if (password === this.password) {
      return true;
    } else {
      return false;
    }
  };
  return Users;
};
