var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')
var prisma = new PrismaClient


/* GET articles listing. */
router.get('/', function (req, res) {


    const articles = await prisma.article.findMany({
        skip: parseInt(req.query.skip),
        take: parseInt(req.query.take),
    })

    res.status(200);
    res.json(articles);




});

router.get('/:id', (req, res) => {
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
        res.json({ message: 'NOT_FOUND' });
    }
});

router.post('/', (req, res) => {
    const article = req.body
    console.log(article);
    const article_ = await prisma.article.create({
        data: {
            titre: article.titre,
            contenu: article.contenu,
            image: article.image,
            published: article.published,
        },
    })

    res.status(200);
    res.json(article_);
});
router.patch('/:id', (req, res) => {

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
router.delete('/:id', (req, res) => {


    const us = await prisma.article.delete({
        where: {
            id: parseInt(req.params.id),
        },
    })
    res.status(200);
    res.json({ message: ` ${us.id}  DELETED` });
});

module.exports = router;
