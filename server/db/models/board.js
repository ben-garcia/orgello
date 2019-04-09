module.exports = (sequelize, DataTypes) => {
  const board = sequelize.define(
    'board',
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      background: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      owner_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {},
  );
  board.associate = (models) => {
    board.belongsTo(models.user, {
      as: 'boards',
      foreignKey: 'owner_id',
    });
  };
  return board;
};
