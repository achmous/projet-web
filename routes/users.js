var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')
const bcrypt = require("bcrypt");
var prisma = new PrismaClient

/* GET users listing. */
router.get('/', function(req, res) {
 
    const users = await prisma.user.findMany({
        skip: parseInt(req.query.skip),
        take: parseInt(req.query.take),
      })
    
      res.status(200);
      res.json(users);
});

router.post('/:id',(req, res) => {
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
        res.json({ message: 'NOT_FOUND' });
      }
});
router.post('/:id', (req, res) => {
  
    const user = req.body

    // Bcrypt pour le cryptage de mot de passe
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
router.patch('/:id', (req, res) => {
  
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
router.delete('/:id', (req, res) => {
 

    const us = await prisma.user.delete({
        where: {
          id: parseInt(req.params.id),
        },
      })
      res.status(200);
      res.json("DELETED");
});


module.exports = router;
