const Sequelize = require('sequelize')
const {Op} = require('sequelize')
const bcrypt = require('bcrypt')
const zlib = require('zlib')

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
    },
    description: {
        type: Sequelize.DataTypes.STRING,
        set(value) {
            const compressed = zlib.deflateSync(value).toString('base64');
            this.setDataValue('description', compressed)
        },
        get() {
            const value = this.getDataValue('description');
            const uncompressed = zlib.inflateSync(Buffer.from(value, 'base64'))
            return uncompressed.toString();
        }
    },
    aboutUser: {
        type: Sequelize.DataTypes.VIRTUAL,
        get() {
            return `${this.id}`
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
})

Movie.sync({alter: true})
.then(() => {
    return Movie.create({
        name: 'hell',
        password: 'abc',
        year_of_release: 34342,
        description: 'hello this is my description'
    })
})
.then(data => {
    console.log(data.toJSON())
})
.catch(err => console.log(err))