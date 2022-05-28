var express = require('express');
var router = express.Router();

 

/* GET categories listing. */
router.get('/', function(req, res) {
 
  var offset = parseInt(req.query.skip, 10);
  var limit = parseInt(req.query.take, 10);
  if (offset && limit) {
      categories = categories.slice(offset, offset + limit)
  }
  res.status(200).json(categories);
});

router.get('/:id',  (req, res) => {
  let categorie = categories.filter(categorie => categorie.id === parseInt(req.params.id));
  if (categorie.length > 0) {
      res.status(200).json(categorie[0]);
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
  let categorie = categories.filter(categorie => categorie.id === parseInt(u.id));

  if (categorie.length > 0) {
      res.status(400).json({
          code: 400,
          message: `Id : ${u.id} already used.`
      });
  }
  else {
      categories.push(u)
      
      res.status(201).json({
          code: 201,
          message: 'Created.',
          categorie: u
      });
  }
});
router.patch('/:id', (req, res) => {
  
  let id = req.params.id
  let categorie = categories.filter(categorie => categorie.id === parseInt(id));
  if (categorie.length > 0) {
      index = categories.findIndex((categorie => categorie.id == parseInt(id)));
      let u = req.body
      u.id = parseInt(id)
      categories[index] = u
      res.status(200).json({
          code: 200,
          message: 'Updated.',
          categorie: u
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
  let categorie = categories.filter(categorie => categorie.id === parseInt(id));
  if (categorie.length > 0) {
      categorie = categorie[0]
      categories.splice(categories.indexOf(categorie), 1);
      
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



let categories = [{"id":1,"nom":"Elevator"},
{"id":2,"nom":"Prefabricated Aluminum Metal Canopies"},
{"id":3,"nom":"Soft Flooring and Base"},
{"id":4,"nom":"Drilled Shafts"},
{"id":5,"nom":"Doors, Frames & Hardware"},
{"id":6,"nom":"Fire Sprinkler System"},
{"id":7,"nom":"Fire Protection"},
{"id":8,"nom":"Retaining Wall and Brick Pavers"},
{"id":9,"nom":"Construction Clean and Final Clean"},
{"id":10,"nom":"Asphalt Paving"}];
module.exports = router;
