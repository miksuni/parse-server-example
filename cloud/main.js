
//Parse.Cloud.define('hello', function(req, res) {
//  res.success('Hi');
//});

Parse.Cloud.define('hello', (req) => {
	console.log(req);
    //return 'ok';
    var returnMessage = '';

    var exercises = Parse.Object.extend("Exercise");
    var query = new Parse.Query(exercises);
    query.find({
		success: function(results) {
			console.log("Exercise query ok");
			returnMessage = 'ok';
		},
		error: function(error) {
			console.log("Exercise query failed: " + error.message);
			returnMessage = 'error';
		}
	});
    return returnMessage;
});