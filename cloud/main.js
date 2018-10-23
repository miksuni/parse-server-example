
//Parse.Cloud.define('hello', function(req, res) {
//  res.success('Hi');
//});

Parse.Cloud.define('hello', (req) => {
	 console.log(req);
     return 'ok';
});