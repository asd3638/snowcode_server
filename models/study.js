const Sequelize = require('sequelize');

module.exports = class Study extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            title: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            category: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            deadLine: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            startLine: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            people: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            wanted: {
                type: Sequelize.TEXT,
                allowNull: true,
                //unique: true,
            },
            create_at: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Study',
            tableName: 'studies',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
        db.Study.belongsTo(db.User, { foreignKey: 'writter', targetKey: 'id'});
        db.Study.hasOne(db.Heart, { foreignKey: 'study_id', targetKey: 'id'});
    }
};
