var express = require('express');
var router = express.Router();



/* GET articles listing. */
router.get('/', function(req, res) {
 
  var offset = parseInt(req.query.skip, 10);
  var limit = parseInt(req.query.take, 10);
  if (offset && limit) {
      articles = articles.slice(offset, offset + limit)
  }
  res.status(200).json(articles);
});

router.get('/:id',  (req, res) => {
  let article = articles.filter(article => article.id === parseInt(req.params.id));
  if (article.length > 0) {
      res.status(200).json(article[0]);
  }
  else {
      res.status(404).json({
          code: 404,
          message: 'Not found'
      });
  }
});

router.post('/',(req, res) => {
  let u = req.body
  console.log(u);
  let article = articles.filter(article => article.id === parseInt(u.id));

  if (article.length > 0) {
      res.status(400).json({
          code: 400,
          message: `Id : ${u.id} already used.`
      });
  }
  else {
      articles.push(u)
      
      res.status(201).json({
          code: 201,
          message: 'Created.',
          article: u
      });
  }
});
router.patch('/:id', (req, res) => {
  
  let id = req.params.id
  let article = articles.filter(article => article.id === parseInt(id));
  if (article.length > 0) {
      index = articles.findIndex((article => article.id == parseInt(id)));
      let u = req.body
      u.id = parseInt(id)
      articles[index] = u
      res.status(200).json({
          code: 200,
          message: 'Updated.',
          article: u
      });
  }
  else {
      res.status(404).json({
          code: 404,
          message: 'Not found'
      });
  }
});
router.delete('/:id', (req, res) => {
 
  let id = req.params.id
  let article = articles.filter(article => article.id === parseInt(id));
  if (article.length > 0) {
      article = article[0]
      articles.splice(articles.indexOf(article), 1);
      
      res.status(200).json({
          code: 200,
          message: 'Deleted.'
      });
  }
  else {
      res.status(404).json({
          code: 404,
          message: 'Not found'
      });
  }
});



let articles = [{"id":1,"titre":"Hadria","contenu":"Hillin","image":"http://dummyimage.com/170x100.png/cc0000/ffffff","createdAt":"9/30/2021","updatedAt":"4/19/2022","published":false},
{"id":2,"titre":"Aridatha","contenu":"Tart","image":"http://dummyimage.com/118x100.png/cc0000/ffffff","createdAt":"10/19/2021","updatedAt":"10/5/2021","published":false},
{"id":3,"titre":"Johnette","contenu":"Alenichicov","image":"http://dummyimage.com/121x100.png/ff4444/ffffff","createdAt":"3/19/2022","updatedAt":"10/15/2021","published":false},
{"id":4,"titre":"Lulu","contenu":"Dulen","image":"http://dummyimage.com/247x100.png/ff4444/ffffff","createdAt":"8/25/2021","updatedAt":"4/29/2022","published":true},
{"id":5,"titre":"Richie","contenu":"Cavell","image":"http://dummyimage.com/202x100.png/5fa2dd/ffffff","createdAt":"1/22/2022","updatedAt":"3/21/2022","published":false},
{"id":6,"titre":"Xymenes","contenu":"Yare","image":"http://dummyimage.com/209x100.png/5fa2dd/ffffff","createdAt":"7/15/2021","updatedAt":"10/26/2021","published":true},
{"id":7,"titre":"Nari","contenu":"Chastagnier","image":"http://dummyimage.com/190x100.png/ff4444/ffffff","createdAt":"7/28/2021","updatedAt":"3/7/2022","published":true},
{"id":8,"titre":"Yorker","contenu":"Bartoletti","image":"http://dummyimage.com/151x100.png/5fa2dd/ffffff","createdAt":"8/7/2021","updatedAt":"1/17/2022","published":true},
{"id":9,"titre":"Kenn","contenu":"Nolin","image":"http://dummyimage.com/205x100.png/cc0000/ffffff","createdAt":"9/30/2021","updatedAt":"6/29/2021","published":true},
{"id":10,"titre":"Allin","contenu":"O'Kenny","image":"http://dummyimage.com/247x100.png/ff4444/ffffff","createdAt":"8/21/2021","updatedAt":"2/12/2022","published":true},
{"id":11,"titre":"Tish","contenu":"Scriviner","image":"http://dummyimage.com/186x100.png/ff4444/ffffff","createdAt":"7/30/2021","updatedAt":"2/18/2022","published":true},
{"id":12,"titre":"Heidi","contenu":"Drohane","image":"http://dummyimage.com/120x100.png/5fa2dd/ffffff","createdAt":"9/14/2021","updatedAt":"3/8/2022","published":true},
{"id":13,"titre":"Emily","contenu":"Boodell","image":"http://dummyimage.com/144x100.png/ff4444/ffffff","createdAt":"3/19/2022","updatedAt":"1/12/2022","published":false},
{"id":14,"titre":"Nettie","contenu":"Franses","image":"http://dummyimage.com/242x100.png/ff4444/ffffff","createdAt":"6/11/2021","updatedAt":"7/30/2021","published":true},
{"id":15,"titre":"Shelia","contenu":"Norquoy","image":"http://dummyimage.com/194x100.png/dddddd/000000","createdAt":"10/5/2021","updatedAt":"5/17/2022","published":true},
{"id":16,"titre":"Kitti","contenu":"Kittoe","image":"http://dummyimage.com/211x100.png/ff4444/ffffff","createdAt":"12/21/2021","updatedAt":"11/6/2021","published":false},
{"id":17,"titre":"Buddie","contenu":"McMylor","image":"http://dummyimage.com/151x100.png/cc0000/ffffff","createdAt":"5/25/2021","updatedAt":"1/11/2022","published":false},
{"id":18,"titre":"Eydie","contenu":"Gammidge","image":"http://dummyimage.com/148x100.png/ff4444/ffffff","createdAt":"3/16/2022","updatedAt":"1/27/2022","published":false},
{"id":19,"titre":"Cassandra","contenu":"Bonar","image":"http://dummyimage.com/150x100.png/5fa2dd/ffffff","createdAt":"4/8/2022","updatedAt":"2/15/2022","published":false},
{"id":20,"titre":"Shannah","contenu":"Siggin","image":"http://dummyimage.com/160x100.png/cc0000/ffffff","createdAt":"5/18/2022","updatedAt":"9/2/2021","published":true}];
module.exports = router;
