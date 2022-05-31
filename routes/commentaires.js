var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')
var prisma = new PrismaClient
/* GET commentaires listing. */
router.get('/', async function (req, res, next) {

    const commentaires = await prisma.commentaire.findMany({
        skip: parseInt(req.query.skip),
        take: parseInt(req.query.take),
    })

    res.status(200);
    res.json(commentaires);
});

// GET one by id
router.get('/:id', async function (req, res, next) {
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
        res.json({ message: 'NOT FOUND' });
    }
});

// ADD commentaire
router.post('/', async function (req, res, next) {
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


// UPDATE commentaire
router.patch('/', async function (req, res, next) {
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
// DELETE commentaire
router.delete('/:id', async function (req, res, next) {


    const us = await prisma.commentaire.delete({
        where: {
            id: parseInt(req.params.id),
        },
    })
    res.status(200);
    res.json(us);
});
module.exports = router;
