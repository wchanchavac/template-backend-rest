'use strict'

const { Model, DataTypes } = require('sequelize')
module.exports = (sequelize) => {

    class User extends Model {
        static associate(models) {

        }
    }

    User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            birthday: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image: {

                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'crud-user   ',
            freezeTableName: true,
            updatedAt: false,
            defaultScope: {
                attributes: {
                    exclude: ['updatedAt', 'deletedAt'],
                },
            },
            scopes: {
            },
            indexes: [
                // {
                //     fields: ["column"],
                //     name: 'table_column_idx',
                //     using: 'BTREE',
                // },
            ],
        },
    )

    return User
}