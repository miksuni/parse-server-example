
Parse.Cloud.define('hello', function(req, res) {
  //res.success('Hi');
  var result = "{OK}"
  res.success(result);
});

/*Parse.Cloud.define(‘hello’, (req) => {
     return ‘ok’;
});*/