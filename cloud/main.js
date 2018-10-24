
//Parse.Cloud.define('hello', function(req, res) {
//  res.success('Hi');
//});

Parse.Cloud.define('hello', (req) => {
	console.log(req);
    //return 'ok';
    var returnMessage = '';

    var exercises = Parse.Object.extend("Exercise");
    returnMessage = 'step 1';
    var query = new Parse.Query(exercises);
    returnMessage = 'step 2';
    query.find().then(function(results) {
		returnMessage = 'step 3';
    }).catch(function(error){
		returnMessage = 'step 4';
    })
    /*query.find({
		success: function(results) {
			console.log("Exercise query ok");
			returnMessage = 'ok';
		},
		error: function(error) {
			console.log("Exercise query failed: " + error.message);
			returnMessage = 'error';
		}
	});*/

    return returnMessage;
});