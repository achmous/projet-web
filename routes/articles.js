var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')
var prisma = new PrismaClient
/* GET articles listing. */
router.get('/', async function (req, res, next) {

    const articles = await prisma.article.findMany({
        skip: parseInt(req.query.skip),
        take: parseInt(req.query.take),
    })

    res.status(200);
    res.json(articles);
});

// GET one by id
router.get('/:id', async function (req, res, next) {
    const article = await prisma.article.findUnique(

        {
            where: {
                id: parseInt(req.params.id),
            },
        }

    )
    if (article) {
        res.status(200);
        res.json(article);
    }
    else {
        res.status(404);
        res.json({ message: 'NOT FOUND' });
    }
});

// ADD article
router.post('/', async function (req, res, next) {
    const article = req.body
    console.log(article);
    const art = await prisma.article.create({
        data: {
            titre: article.titre,
            contenu: article.contenu,
            // l'image sera encodé en base64
            image: article.image,
            published: article.published,
        },
    })

    res.status(200);
    res.json(art);
});


// UPDATE ARTICLE
router.patch('/', async function (req, res, next) {
    const body = req.body
    console.log(body);
    const article = await prisma.article.update({
        where: {
            id: parseInt(body.id),

        },
        data: {
            titre: body.titre,
            contenu: body.contenu,
            image: body.image,
            published: body.published,
            updatedAt: new Date()
        },
    })

    res.status(200);
    res.json(article);
});
// DELETE article
router.delete('/:id', async function (req, res, next) {


    const us = await prisma.article.delete({
        where: {
            id: parseInt(req.params.id),
        },
    })
    res.status(200);
    res.json({ message: `Deleted ${us.id}` });

});
router.get('/top/:top', async function (req, res, next) {
    const articles = await prisma.article.findMany({
        take: parseInt(req.params.top),
        orderBy: {
            createdAt: 'desc',
        }
    })
    res.status(200);
    res.json(articles);
});
module.exports = router;
