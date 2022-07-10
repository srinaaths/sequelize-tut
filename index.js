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
    return Movie.bulkCreate([{
        name: 'Call Of Duty',
        year_of_release: 2003
    },{
        name: 'Call of Duty 2',
        year_of_release: 2005
    }])
})
.then((data) => {
    console.log(data.toJSON())
})
.catch(err => console.log(err));
