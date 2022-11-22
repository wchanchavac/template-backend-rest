(async () => {
    'use strict'

    require('dotenv').config()
    const { faker } = require('@faker-js/faker');
    const db = require('../database')

    function getUser() {
        return {
            name: faker.name.fullName(),
            birthday: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
            email: `${faker.internet.email()}`.toLowerCase(),
            password: faker.internet.password(6, true),
            image: faker.internet.avatar(),
        }
    }


    for (let i = 0; i < 500; i++) {
        await db.User.create(getUser());
    }

    // 'use strict'

    // require('dotenv').config()
    // const { faker } = require('@faker-js/faker');
    // const db = require('../database')

    // var users = await db.User.findAll()


    // for (let i = 0; i < users.length; i++) {
    //     const user = users[i];
    //     await user.update({ ...user, email: `${user.email}`.toLowerCase()}, {
    //         where: {
    //             id: user.id
    //         }
    //     })
        
    // }

    return;
})();