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
    // board is the source
    // user is the target
    board.belongsTo(models.user, {
      // property on the source to refer to the target
      as: 'owner', // board.owner
      foreignKey: 'ownerId', // field in boards table that pionts to users PK
    });
  };
  return board;
};
