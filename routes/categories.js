var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')
var prisma = new PrismaClient
/* GET categories listing. */
router.get('/', async function (req, res, next) {

    const categories = await prisma.categorie.findMany({
        skip: parseInt(req.query.skip),
        take: parseInt(req.query.take),
    })

    res.status(200);
    res.json(categories);
});

// GET one by id
router.get('/:id', async function (req, res, next) {
    const categorie = await prisma.categorie.findUnique(

        {
            where: {
                id: parseInt(req.params.id),
            },
        }

    )
    if (categorie) {
        res.status(200);
        res.json(categorie);
    }
    else {
        res.status(404);
        res.json({ message: 'NOT FOUND' });
    }
});

// ADD categorie
router.post('/', async function (req, res, next) {
    const categorie = req.body
console.log(categorie);
    const art = await prisma.categorie.create({
        data: {
            nom: categorie.nom
        },
    })

    res.status(200);
    res.json(art);
});


// UPDATE categorie
router.patch('/', async function (req, res, next) {
    const body = req.body
    console.log(body);
    const categorie = await prisma.categorie.update({
        where: {
            id: parseInt(body.id),

        },
        data: {
            nom: body.nom,
             
        },
    })

    res.status(200);
    res.json(categorie);
});
// DELETE categorie
router.delete('/:id', async function (req, res, next) {


    const categorie = await prisma.categorie.delete({
        where: {
            id: parseInt(req.params.id),
        },
    })
    res.status(200);
    res.json({message: `Deleted ${categorie.id}`});
});


// find all
router.get('/find/all', async function (req, res, next) {

    const categories = await prisma.categorie.findMany( {
        include:{
          
                articles:true
             
        }
    })

    res.status(200);
    res.json(categories);
});
module.exports = router;
