module.exports = (sequelize, DataTypes) => {
  const list = sequelize.define(
    'list',
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      order: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      archived: {
        type: DataTypes.BOOLEAN,
      },
      boardId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {},
  );
  list.associate = (models) => {
    list.belongsTo(models.board, {
      as: 'lists',
      foreignKey: 'boardId',
    });
    list.hasMany(models.card);
  };
  return list;
};
