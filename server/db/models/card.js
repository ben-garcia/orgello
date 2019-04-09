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
      board_id: {
        type: DataTypes.INTEGER,
      },
    },
    {},
  );
  card.associate = (models) => {
    card.belongsTo(models.list, {
      as: 'cards',
      foreignKey: 'list_id',
    });
  };
  return card;
};
