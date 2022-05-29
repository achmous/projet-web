var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')
var prisma = new PrismaClient
 

/* GET categories listing. */
router.get('/', function(req, res) {
 
    const categories = await prisma.categorie.findMany({
        skip: parseInt(req.query.skip),
        take: parseInt(req.query.take),
    })

    res.status(200);
    res.json(categories);
});

router.get('/:id',  (req, res) => {
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
        res.json({ message: 'NOT_FOUND' });
    }
});

router.post('/',(req, res) => {
    const categorie = req.body
    console.log(categorie);
        const category = await prisma.categorie.create({
            data: {
                nom: categorie.nom
            },
        })
    
        res.status(200);
        res.json(category);
});
router.patch('/:id', (req, res) => {
  
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
router.delete('/:id', (req, res) => {
    const categorie = await prisma.categorie.delete({
        where: {
            id: parseInt(req.params.id),
        },
    })
    res.status(200);
    res.json({message: ` ${categorie.id} DELETED`});
});




module.exports = router;
