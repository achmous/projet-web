
const { PrismaClient } = require('@prisma/client');

const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();



async function main() {

    await prisma.commentaire.deleteMany();
    console.log("Deleted records in commentaire table");

    await prisma.categoriesArticle.deleteMany();
    console.log("Deleted records in categoriesArticle table");
    await prisma.categorie.deleteMany();
    console.log("Deleted records in category table");



    await prisma.article.deleteMany();
    console.log("Deleted records in article table");
    await prisma.user.deleteMany();
    console.log("Deleted records in article table");


    const randomEmail = faker.internet.email();

    allUsers = []
    console.log('Seeding...');
    /// --------- 10 utilisateurs ayant le rôle “AUTHOR” ---------------
    for (let i = 0; i < 10; i++) {
        const u = await prisma.user.create({
            data: {

                nom: faker.name.findName(),
                email: faker.internet.email(),
                password: "$2a$10$YAImT8HWK8nIeRvPOQpWuunaIXwr.xYJOozTZY2cPJemVh0obPh5q"
            }
        });


        allUsers.push(u.id)
    }
    /// --------- 1 utilisateur ayant le rôle “ADMIN” ---------------    
    await prisma.user.create({
        data: {

            nom: faker.name.findName(),
            email: faker.internet.email(),
            role: "ADMIN",
            password: "$2a$10$u/Wgz0e3ZttpPVQVTzfBku1T2GVBtXjKDv19FEK/CUz5m/Qw9kqPm"

        }
    });

    // 10 catégories 
    allCaterogies = []
    for (let i = 0; i < 10; i++) {
        let c = await prisma.categorie.create({
            data: {

                nom: faker.word.adverb()
            }
        });
        allCaterogies.push(c.id)
    }
let AllArticles = []
    let c
    for (let i = 0; i < 100; i++) {
        c = await prisma.article.create({
            data: {

                titre: faker.lorem.sentence(),
                contenu: faker.lorem.text(),
                authorId: allUsers[Math.floor(Math.random() * 10)],
                image: faker.image.imageUrl()

            }
        });
        AllArticles.push(c.id)
        for (let index = 0; index < 4; index++) {
            prisma.categoriesArticle.create({
                data: {
                    articleId: c.id,
                    categorieId: allCaterogies[Math.floor(Math.random() * 10)]
                }
            }).catch(s => {

            })

        }
    }


    AllArticles.forEach(element => {

        let  countCon = Math.floor(Math.random()*21)
         for (let index = 0; index < countCon; index++) {
            prisma.categoriesArticle.create({
                data: {
                    articleId: element,
                    categorieId: allCaterogies[Math.floor(Math.random() * 10)]
                }
            }).catch(s => {

            })

        }
    });
};
main().then(r => {




})