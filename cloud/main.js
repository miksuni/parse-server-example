
//Parse.Cloud.define('hello', function(req, res) {
//  res.success('Hi');
//});

//Parse.Cloud.define('hello', (req) => {
Parse.Cloud.define('hello', async (req) => {
	console.log(req);
    //return 'ok';
    var returnMessage = '...';

    /*var exercises = Parse.Object.extend("Exercise");
    returnMessage = 'step 1';
    var query = new Parse.Query(exercises);
    returnMessage = 'step 2';
    query.find().then(function(results) {
		returnMessage = 'step 3';
    }).catch(function(error){
		returnMessage = 'step 4';
    });*/
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

	/*var obj = new Parse.Object('GameScore');
	returnMessage = 'step 1';
	obj.set('score',1337);
	returnMessage = 'step 2';
	obj.save().then(function(obj) {
		returnMessage = 'step 3';
		console.log(obj.toJSON());
		var query = new Parse.Query('GameScore');
		returnMessage = 'step 4';
		query.get(obj.id).then(function(objAgain) {
			returnMessage = 'step 5';
			console.log(objAgain.toJSON());
		}, function(err) {console.log(err); });
	}, function(err) { console.log(err); });*/

	//var query = new Parse.Query('Exercise');
	//query.find().then(function(results) {
	//	console.log('found');
	//	returnMessage = 'step 3';
	//	return returnMessage;
	//}, function(err) {console.log(err); });

	const query = new Parse.Query('Exercise');
	const results = await query.find();
	let sum = 0;
	for (let i = 0; i < results.length; ++i) {
		sum += results[i].get("stars");
	}
	return sum / results.length;

    //return returnMessage;
});