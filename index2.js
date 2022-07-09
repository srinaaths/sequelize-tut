const Sequelize = require('sequelize')

const sequelize = new Sequelize('sequelize-video', 'srinaaths', '', {
    dialect: 'postgres'
})

const movie = sequelize.define('movie', {
    movie_id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    year_of_release: {
        type: Sequelize.DataTypes.INTEGER,
        allowNullValue: false
    }
}, {
    freezeTableName: true,
    timestamps: false
})

movie.sync({force: true});