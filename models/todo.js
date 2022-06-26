const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      todo: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      }
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Todo',
      tableName: 'todos',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db){
    db.Todo.belongsTo(db.User, { foreignKey: 'userid', targetKey: 'id'});
  }
}