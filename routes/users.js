var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')
const bcrypt = require("bcrypt");
var prisma = new PrismaClient
/* GET users listing. */
router.get('/', async function (req, res, next) {

  const users = await prisma.user.findMany({
    skip: parseInt(req.query.skip),
    take: parseInt(req.query.take),
  })

  res.status(200);
  res.json(users);
});
// GET one by id
router.get('/:id', async function (req, res, next) {
  const user = await prisma.user.findUnique(

    {
      where: {
        id: parseInt(req.params.id),
      },
    }

  )
  if (user) {
    res.status(200);
    res.json(user);
  }
  else {
    res.status(404);
    res.json({ message: 'NOT FOUND' });
  }
});
// ADD USER
router.post('/', async function (req, res, next) {
  const user = req.body
  const salt = await bcrypt.genSalt(10);
  const us = await prisma.user.create({
    data: {
      email: user.email,
      nom: user.nom,
      password: await bcrypt.hash(user.password, salt),
    },
  })
 
  res.status(200);
  res.json(us);
});

// UPDATE USER
router.patch('/', async function (req, res, next) {
  const body = req.body
console.log(body);
  const us = await prisma.user.update({
    where: {
      id: parseInt(body.id),

    },
    data: {
      email: body.email,
      nom: body.nom,

    },
  })

  res.status(200);
  res.json(us);
});
// DELETE USER
router.delete('/:id', async function (req, res, next) {


  const us = await prisma.user.delete({
    where: {
      id: parseInt(req.params.id),
    },
  })
  res.status(200);
  res.json(us);
});
module.exports = router;
