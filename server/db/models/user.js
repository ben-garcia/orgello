module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      username: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
          notEmtpy: true,
          min: 6,
          max: 30,
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          min: 6,
          max: 30,
        },
      },
    },
    {},
  );
  user.associate = (models) => {
    user.hasMany(models.board);
  };
  return user;
};
