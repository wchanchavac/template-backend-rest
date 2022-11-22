const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require(`./../config/database`)

const { database, username, password } = config;
const operatorsAliases = require("./operatorsAliases")(Sequelize);
let sequelize = new Sequelize(database, username, password, { ...config, operatorsAliases });

const User = require('./models/user.model')(sequelize)

const db = {
	User,
	sequelize
}

for (const key in db) {
	if (Object.hasOwnProperty.call(db, key)) {
		const entity = db[key]
		if (entity.associate) {
			entity.associate(db)
		}
	}
}

if (env != 'production') {
	sequelize.sync({
		// force: true,
		// alter: {
		// 	drop: true,
		// },
	})
}

module.exports = db