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
        allowNull: false
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
    return Movie.create({
        name: 'Call Of Duty',
        year_of_release: 1998
    })
})
.then((data) => {
    data.name = 'lol changing'
    data.increment({year_of_release: 2})
    data.save({fields: ['name']})
})
.catch(err => console.log(err));
