/*var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
module.exports = router;
*/
module.exports = function(app) {
  app.get('/hello', function(req, res) {
    res.render('index', { title: 'ExpressZ', hello: '<h1>Hello Title!</h1>' });
  });
  app.get('/test', function(req, res) {
    res.send('Hello World!');
  });
}
