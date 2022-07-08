const Sequelize = require('sequelize')

const sequelize = new Sequelize('sequelize-video', 'srinaaths', '', {
    dialect: 'postgres'
})

const myFunc = async () => {
    await sequelize.authenticate();
    console.log('connected');
}

sequelize.authenticate()
.then(() => console.log('connected'))
.catch(err => console.log(err))