'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
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
                validate:{
                    isEmail: true
                },
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

            salt:{
                type: Sequelize.DataTypes.STRING
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    }
};