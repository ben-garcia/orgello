module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      email: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {},
  );
  user.associate = (models) => {
    user.hasMany(models.board);
  };
  return user;
};
