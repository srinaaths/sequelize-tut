const Sequelize = require('sequelize')

const sequelize = new Sequelize('sequelize-video', 'srinaaths', '', {
    dialect: 'postgres'
})

const User = sequelize.define('user', {
    user_id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    date_of_birth: {
        type: Sequelize.DataTypes.DATE
    }
}, {
    freezeTableName: true,
    timestamps: false
})

User.drop();

User.sync({force: true})