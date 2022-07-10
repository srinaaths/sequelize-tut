const Sequelize = require('sequelize')
const {Op} = require('sequelize')

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

// Movie.sync({alter: true})
// .then(() => {
//     return Movie.findAll({
//         where: {year_of_release: 2003},
//         order: [['year_of_release', 'ASC']]
//     })
// })
// .then(data => {
//     data.forEach(ele => {
//         console.log(ele.toJSON())
//     })
// })
// .catch(err => console.log(err))

Movie.sync({alter: true})
.then(() => {
    return Movie.findAndCountAll({where: {
        year_of_release: {
            [Op.or]: {
                [Op.eq]: 2005,
            }
        }
    }})
})
.then(data => {
    const {count, rows} = data
    console.log(count);
    console.log(rows);
})
.catch(err => console.log(err))