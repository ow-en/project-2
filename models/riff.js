module.exports = function(sequelize, DataTypes) {
  var Riffs = sequelize.define(
    "Riffs",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],

          isValidString: function(value) {
            if (!(typeof value === "string")) {
              throw new Error("title field must be a string!");
            } else {
              return true;
            }
          }
        }
      },
      sequence: {
        type: DataTypes.STRING(1234),
        allowNull: false,
        validate: {
          len: [1],
          isValidString: function(value) {
            if (!(typeof value === "string")) {
              throw new Error("sequence field must be a string!");
            } else {
              return true;
            }
          },

          isStringifiedArray: function(value) {
            try {
              if (JSON.parse(value) instanceof Array) {
                return true;
              }
            } catch (error) {
              throw new Error("sequence field must be a stringified array!");
            }
          }
        }
      },
      tempo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [2, 3],

          min: 10,
          max: 300,

          isNotString: function(value) {
            if (typeof value === "string") {
              throw new Error("tempo field cannot be a string");
            } else {
              return true;
            }
          }
        },
        defaultValue: 120
      },
      beat_division: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1, 2],

          isIn: [[4, 8, 16]],
          isNotString: function(value) {
            if (typeof value === "string") {
              throw new Error("beat_division field cannot be a string");
            } else {
              return true;
            }
          }
        },
        defaultValue: 8
      },
      display: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    },
    {
      freezeTableName: true
    }
  );

  Riffs.associate = function(models) {

    Riffs.belongsTo(models.Users, {
      onDelete: "CASCADE"
    });

    Riffs.hasMany(models.Favorites, {
      onDelete: "CASCADE"
    });
  };


  return Riffs;
};


