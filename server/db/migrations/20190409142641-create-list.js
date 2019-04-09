module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('lists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
        validates: {
          notEmpty: true,
        },
      },
      order: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validates: {
          notEmpty: true,
        },
      },
      archived: {
        type: Sequelize.BOOLEAN,
      },
      boardId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  // eslint-disable-next-line
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('lists');
  },
};
