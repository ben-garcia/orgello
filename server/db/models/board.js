module.exports = (sequelize, DataTypes) => {
  const board = sequelize.define(
    'board',
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING,
        validates: {
          notEmpty: true,
        },
      },
      background: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      ownerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {},
  );
  board.associate = (models) => {
    board.belongsTo(models.user, {
      as: 'owner',
      foreignKey: 'ownerId',
    });
  };
  return board;
};
