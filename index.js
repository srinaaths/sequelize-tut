const Sequelize = require('sequelize')
const {Op} = require('sequelize')
const bcrypt = require('bcrypt')

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
        },
        get() {
            const rawValue = this.getDataValue('name')
            return rawValue.toLowerCase()
        }
    },
    year_of_release: {
        type: Sequelize.DataTypes.INTEGER,
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        set(value) {
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(value, salt)
            this.setDataValue('password', hash)
        }
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
    return Movie.create({
        name: 'hell',
        password: 'abc',
        year_of_release: 34342
    })
})
.then(data => {
    console.log(data.toJSON())
})
.catch(err => console.log(err))