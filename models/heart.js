const Sequelize = require('sequelize');

module.exports = class Study extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            study_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Heart',
            tableName: 'hearts',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
        db.Heart.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id'});
        db.Heart.belongsTo(db.Study, { foreignKey: 'study_id', targetKey: 'id' });
    } 
};