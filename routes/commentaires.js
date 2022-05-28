var express = require('express');
var router = express.Router();


 
/* GET commentaires listing. */
router.get('/', function(req, res) {
 
  var offset = parseInt(req.query.skip, 10);
  var limit = parseInt(req.query.take, 10);
  if (offset && limit) {
      commentaires = commentaires.slice(offset, offset + limit)
  }
  res.status(200).json(commentaires);
});

router.get('/:id',  (req, res) => {
  let commentaire = commentaires.filter(commentaire => commentaire.id === parseInt(req.params.id));
  if (commentaire.length > 0) {
      res.status(200).json(commentaire[0]);
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
  let commentaire = commentaires.filter(commentaire => commentaire.id === parseInt(u.id));

  if (commentaire.length > 0) {
      res.status(400).json({
          code: 400,
          message: `Id : ${u.id} already used.`
      });
  }
  else {
      commentaires.push(u)
      
      res.status(201).json({
          code: 201,
          message: 'Created.',
          commentaire: u
      });
  }
});
router.patch('/:id', (req, res) => {
  
  let id = req.params.id
  let commentaire = commentaires.filter(commentaire => commentaire.id === parseInt(id));
  if (commentaire.length > 0) {
      index = commentaires.findIndex((commentaire => commentaire.id == parseInt(id)));
      let u = req.body
      u.id = parseInt(id)
      commentaires[index] = u
      res.status(200).json({
          code: 200,
          message: 'Updated.',
          commentaire: u
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
  let commentaire = commentaires.filter(commentaire => commentaire.id === parseInt(id));
  if (commentaire.length > 0) {
      commentaire = commentaire[0]
      commentaires.splice(commentaires.indexOf(commentaire), 1);
      
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



let commentaires =[{"id":1,"nom":"harness compelling bandwidth","email":"ctunnow0@biblegateway.com"},
{"id":2,"nom":"empower synergistic functionalities","email":"rocrevy1@pagesperso-orange.fr"},
{"id":3,"nom":"evolve cross-media methodologies","email":"pfaust2@usgs.gov"},
{"id":4,"nom":"cultivate granular partnerships","email":"kallenby3@soup.io"},
{"id":5,"nom":"implement real-time web services","email":"grounds4@fda.gov"},
{"id":6,"nom":"grow dot-com functionalities","email":"agarnson5@csmonitor.com"},
{"id":7,"nom":"facilitate scalable communities","email":"msmylie6@disqus.com"},
{"id":8,"nom":"syndicate turn-key initiatives","email":"awitt7@nymag.com"},
{"id":9,"nom":"grow real-time web-readiness","email":"gnorres8@networksolutions.com"},
{"id":10,"nom":"unleash open-source e-tailers","email":"medmonson9@fc2.com"}];
module.exports = router;
