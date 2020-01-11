module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  });
  Users.associate = function (models) {
    // Associating Band with Songs
    // When an Band is deleted, also delete any associated Songs
    Users.hasMany(models.Chat, {
      onDelete: "cascade"
    });
  };
  Users.prototype.validPassword = function(password) {
    if(password === this.password){
      return true;
    }
    else{
      return false;
    }
  };
  return Users;
};
