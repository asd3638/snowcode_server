const Sequelize = require('sequelize');

module.exports = class Chat extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      chat: {
        type: Sequelize.STRING(40),
        required: true
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Chat',
      tableName: 'chats',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  static associate(db) {
    db.Chat.belongsTo(db.User, { targetKey: 'id' });
    db.Chat.belongsTo(db.Room, { targetKey: 'id' });
  }
};
