
//Parse.Cloud.define('hello', function(req, res) {
//  res.success('Hi');
//});

//Parse.Cloud.define('hello', (req) => {
Parse.Cloud.define('hello', async (req) => {
	console.log(req);

    var returnMessage = '...';

    settingsStr: string = '';
	settings = { name:'', exerciseCount:'', pauseInSec:'', repeatsInSet:'' };

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
	//for (let i = 0; i < results.length; ++i) {
	//	sum += results[i].get("stars");
	//}
	//return sum / results.length;
	return results.length;

    //return returnMessage;
});

Parse.Cloud.define('settings', async (req) => {
	//console.log(">>Request: " + JSON.stringify(req));

	if (Object.keys(req.params).length > 0) {
		console.log(">> json contains data");

		var newSettings = new Parse.Object('Settings');

		if ('name' in req.params) {
			console.log('>>' + req.params.name);
			newSettings.name = req.params.name;
			console.log('>>>>' + newSettings.name);
		} else {console.log('>>> name not found');}
		if ('exerciseCount' in req.params) {
			console.log('>>' + req.params.exerciseCount);
			newSettings.exerciseCount = req.params.exerciseCount;
			console.log('>>>>' + newSettings.exerciseCount);
		} else {console.log('>> exerciseCount not found');}
		if ('pauseInSec' in req.params) {
			console.log('>>' + req.params.pauseInSec);
			newSettings.pauseInSec = req.params.pauseInSec;
			console.log('>>>>' + newSettings.pauseInSec);
		}
		if ('repeatsInSet' in req.params) {
			console.log('>>' + req.params.repeatsInSet);
			newSettings.repeatsInSet = req.params.repeatsInSet;
			console.log('>>>>' + newSettings.repeatsInSet);
		}

		newSettings.save().then(function(newSettings) {
			console.log('>> settings saved');
		}, function(err) { console.log('>> error in saving: ' + err); });

	} else {
		console.log(">> empty json");
	}

	let returnMessage = '';

	const query = new Parse.Query('Settings');
	const results = await query.find();

	if (results.length > 0) {
		settingsNameVal = results[0].get("name");
		exerciseCountVal = results[0].get("exerciseCount");
		pauseInSecVal = results[0].get("pauseInSec");
		repeatsInSetVal = results[0].get("repeatsInSet");
	}

	returnMessage =  JSON.stringify({name: settingsNameVal,
						  exerciseCount: exerciseCountVal,
						  pauseInSec: pauseInSecVal,
						  repeatsInSet: repeatsInSetVal});
	console.log('>> return message: ' + returnMessage);
	return returnMessage;
});