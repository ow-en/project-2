module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],

        isValidString: function(value) {
          if (!(typeof value === "string")) {
            throw new Error("username field must be a string!");
          } else {
            return true;
          }
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],

        isValidString: function(value) {
          if (!(typeof value === "string")) {
            throw new Error("password field must be a string!");
          } else {
            return true;
          }
        }
      }
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4],

        isValidString: function(value) {
          if (!(typeof value === "string")) {
            throw new Error("displayName field must be a string!");
          } else {
            return true;
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],

        isValidString: function(value) {
          if (!(typeof value === "string")) {
            throw new Error("email field must be a string!");
          } else {
            return true;
          }
        }
      }
    }
  });

  Users.associate = function(models) {

    Users.hasMany(models.Riffs, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Users;
};


