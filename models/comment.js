const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            comment: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            userNick: {
                type: Sequelize.STRING(30),
                allowNull: true,        
            },
            create_at: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Comment',
            tableName: 'comments',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
        db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id'});
        db.Comment.belongsTo(db.Study, { foreignKey: 'study', targetKey: 'id'});
    }
};