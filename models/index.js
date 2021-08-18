const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Study = require('./study');
const Comment = require('./comment');
const Heart = require('./heart');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Study = Study;
db.Comment = Comment;
db.Heart = Heart;

User.init(sequelize);
Study.init(sequelize);
Comment.init(sequelize);
Heart.init(sequelize);

User.associate(db)
Study.associate(db);
Comment.associate(db);
Heart.associate(db);

module.exports = db;
