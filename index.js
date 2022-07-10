const Sequelize = require('sequelize')

const sequelize = new Sequelize('sequelize-video', 'srinaaths', '', {
    dialect: 'postgres'
})

const Movie = sequelize.define('movie', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4, 6]
        }
    },
    year_of_release: {
        type: Sequelize.DataTypes.INTEGER,
    }
}, {
    timestamps: false,
    freezeTableName: true
})

Movie.sync({alter: true})
.then(() => {
    return Movie.findAll({
        attributes: [[sequelize.fn('SUM', sequelize.col('year_of_release')), 'total']]
    })
})
.then(data => {
    data.forEach(ele => {
        console.log(ele.toJSON())
    })
})
.catch(err => console.log(err))

//comment