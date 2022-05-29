var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')
var prisma = new PrismaClient

 
/* GET commentaires listing. */
router.get('/', function(req, res) {
 
    const commentaires = await prisma.commentaire.findMany({
        skip: parseInt(req.query.skip),
        take: parseInt(req.query.take),
    })

    res.status(200);
    res.json(commentaires);
});

router.get('/:id',  (req, res) => {
    const commentaire = await prisma.commentaire.findUnique(

        {
            where: {
                id: parseInt(req.params.id),
            },
        }

    )
    if (commentaire) {
        res.status(200);
        res.json(commentaire);
    }
    else {
        res.status(404);
        res.json({ message: 'NOT_FOUND' });
    }
});

router.post('/',(req, res) => {
    const commentaire = req.body
    console.log(commentaire);
        const comm = await prisma.commentaire.create({
            data: {
               
                email: commentaire.email,
                contenu: commentaire.contenu 
            },
        })
    
        res.status(200);
        res.json(comm);
});
router.patch('/:id', (req, res) => {
    const body = req.body
    console.log(body);
    const commentaire = await prisma.commentaire.update({
        where: {
            id: parseInt(body.id),

        },
        data: {
            email:body.email,
            contenu: body.contenu 

        },
    })

    res.status(200);
    res.json(commentaire);
});
router.delete('/:id', (req, res) => {
 
  
    const us = await prisma.commentaire.delete({
        where: {
            id: parseInt(req.params.id),
        },
    })
    res.status(200);
    res.json("DELETED");
});

module.exports = router;
