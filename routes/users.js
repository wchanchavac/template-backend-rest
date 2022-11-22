var express = require('express');
const db = require('../database');
var router = express.Router();
var log = require('debug')('template-backend-rest:users')
const boom = require('@hapi/boom')

/* POST login. */
router.post('/login', async (req, res, next) => {
  try {
    const { password, username: email } = req.body
    const user = await db.User.findOne({
      where: {
        email,
        password,
      },
      attributes: {
        exclude: ['password']
      }
    });

    if (!user) {
      return next(boom.forbidden(`Invalid credentials`))
    }
    res.json(user);

  } catch (error) {
    next(error)
  }
});

/* GET users listing. */
router.get('/users/', async (req, res, next) => {
  try {
    let { limit = 50, page = 1 } = req.query;
    if (page < 0) page = 1;

    const users = await db.User.findAndCountAll({
      attributes: {
        exclude: ['password']
      },
      limit,
      offset: (page - 1) * limit
    });
    res.json({ ...users, pages: Math.ceil(users.count / limit) });

  } catch (error) {
    next(error)
  }
});

/* GET users by listing. */
router.get('/users/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await db.User.findByPk(id, {
      attributes: {
        exclude: ['password']
      }
    })
    if (!user) {
      return next(boom.notFound(`User with id: ${id} not found`))
    }

    res.json(user);
  } catch (error) {
    next(error)
  }

});

/* POST users listing. */
router.post('/users/', async (req, res, next) => {
  try {
    const input = req.body
    const user = await db.User.create(input, {
      attributes: {
        exclude: ['password']
      }
    })
    res.json(user);
  } catch (error) {
    next(error)
  }
});

/* PUT users listing. */
router.put('/users/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const input = req.body;
    const user = await db.User.findByPk(id, {
      attributes: {
        exclude: ['password']
      }
    })
    if (!user) {
      return next(boom.notFound(`User with id: ${id} not found`))
    }

    await user.update(input)
    res.json(user);
  } catch (error) {
    next(error)
  }
});

/* DELETE users listing. */
router.delete('/users/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await db.User.findByPk(id, {
      attributes: {
        exclude: ['password']
      }
    })
    if (!user) {
      return next(boom.notFound(`User with id: ${id} not found`))
    }

    await user.destroy()
    res.json(user);
  } catch (error) {
    next(error)
  }
});



module.exports = router;
