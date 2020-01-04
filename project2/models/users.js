module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.NUMBER,
    name: DataTypes.STRING
  });

  return Users;
};
