const Sequelize = require('sequelize');

module.exports = class Room extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: Sequelize.STRING(40),
        required: true
      },
      max: {
        type: Sequelize.INTEGER(15),
        required: true,
        defaultValue: 10,
        min: 2
      },
      owner: {
        type: Sequelize.STRING(100),
        required: true
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Room',
      tableName: 'rooms',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  static associate(db) {
    db.Room.belongsTo(db.User, { targetKey: 'id' });
    db.Room.hasMany(db.Chat, { sourceKey: 'id' });
  }
};
