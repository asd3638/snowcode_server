const Sequelize = require('sequelize')

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({          
            id: {
                type: Sequelize.INTEGER,
                autoIncrement : true,
                primaryKey : true,
                allowNull: false,
                unique: true,
            },

            mail: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },

            nickName: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },

            password:{
                type: Sequelize.STRING(20),
                allowNull: false,
            },

            provider:{
                type: Sequelize.STRING(10),
            },
         
            snsId:{
                type: Sequelize.INTEGER.UNSIGNED,
            },

            studentId:{
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                unique : true,
            },

            major:{
                type: Sequelize.STRING(20),
            },

            userInfo:{
                type: Sequelize.TEXT,
                allowNull: true,
            },
            score:{ 
                type: Sequelize.INTEGER,
                defaultValue : 10,
            },

        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

};