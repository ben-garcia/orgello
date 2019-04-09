module.exports = (sequelize, DataTypes) => {
  const card = sequelize.define(
    'card',
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      archived: {
        type: DataTypes.BOOLEAN,
      },
      listId: {
        type: DataTypes.INTEGER,
      },
    },
    {},
  );
  card.associate = (models) => {
    card.belongsTo(models.list, {
      as: 'list',
      foreignKey: 'listId',
    });
  };
  return card;
};
