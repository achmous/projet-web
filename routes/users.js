var express = require('express');
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res) {
 
  var offset = parseInt(req.query.skip, 10);
  var limit = parseInt(req.query.take, 10);
  if (offset && limit) {
      users = users.slice(offset, offset + limit)
  }
  res.status(200).json(users);
});

router.get('/:id',  (req, res) => {
  let user = users.filter(user => user.id === parseInt(req.params.id));
  if (user.length > 0) {
      res.status(200).json(user[0]);
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
  let user = users.filter(user => user.id === parseInt(u.id));

  if (user.length > 0) {
      res.status(400).json({
          code: 400,
          message: `Id : ${u.id} already used.`
      });
  }
  else {
      users.push(u)
      
      res.status(201).json({
          code: 201,
          message: 'Created.',
          user: u
      });
  }
});
router.patch('/:id', (req, res) => {
  
  let id = req.params.id
  let user = users.filter(user => user.id === parseInt(id));
  if (user.length > 0) {
      index = users.findIndex((user => user.id == parseInt(id)));
      let u = req.body
      u.id = parseInt(id)
      users[index] = u
      res.status(200).json({
          code: 200,
          message: 'Updated.',
          user: u
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
  let user = users.filter(user => user.id === parseInt(id));
  if (user.length > 0) {
      user = user[0]
      users.splice(users.indexOf(user), 1);
      
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



let users =[{"id":1,"nom":"Farrand","email":"ftoseland0@tmall.com","role":"Project Manager"},
{"id":2,"nom":"Germaine","email":"gkinvan1@java.com","role":"Surveyor"},
{"id":3,"nom":"Urban","email":"ugaratty2@phoca.cz","role":"Surveyor"},
{"id":4,"nom":"Craggy","email":"cmccandie3@google.pl","role":"Architect"},
{"id":5,"nom":"Gerardo","email":"gsavatier4@photobucket.com","role":"Construction Worker"},
{"id":6,"nom":"Curt","email":"ckonertz5@hhs.gov","role":"Project Manager"},
{"id":7,"nom":"Parker","email":"pgoss6@t.co","role":"Construction Worker"},
{"id":8,"nom":"Gun","email":"guc7@mashable.com","role":"Subcontractor"},
{"id":9,"nom":"Monro","email":"mollett8@hostgator.com","role":"Supervisor"},
{"id":10,"nom":"Vallie","email":"vdumberell9@sbwire.com","role":"Electrician"},
{"id":11,"nom":"Tommie","email":"ttillarda@behance.net","role":"Surveyor"},
{"id":12,"nom":"Marijn","email":"mbilovusb@issuu.com","role":"Surveyor"},
{"id":13,"nom":"Mace","email":"mbartolozzic@naver.com","role":"Surveyor"},
{"id":14,"nom":"Eugenie","email":"ecodlind@sina.com.cn","role":"Construction Foreman"},
{"id":15,"nom":"Fielding","email":"fwinslete@opera.com","role":"Architect"}];
module.exports = router;
