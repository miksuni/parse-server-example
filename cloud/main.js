
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

	/*if (Object.keys(req.params).length > 0) {
		console.log(">> json contains data");

		var newSettings = new Parse.Object('Settings');

		if ('name' in req.params) {
			console.log('>>' + req.params.name);
			//newSettings.name = req.params.name;
			newSettings.set('name', req.params.name);
			console.log('>>>>' + newSettings.name);
		} else {console.log('>>> name not found');}
		if ('exerciseCount' in req.params) {
			console.log('>>' + req.params.exerciseCount);
			//newSettings.exerciseCount = req.params.exerciseCount;
			newSettings.set('exerciseCount', parseInt(req.params.exerciseCount,10));
			console.log('>>>>' + newSettings.exerciseCount);
		} else {console.log('>> exerciseCount not found');}
		if ('pauseInSec' in req.params) {
			console.log('>>' + req.params.pauseInSec);
			//newSettings.pauseInSec = req.params.pauseInSec;
			newSettings.set('pauseInSec', parseInt(req.params.pauseInSec,10));
			console.log('>>>>' + newSettings.pauseInSec);
		}
		if ('repeatsInSet' in req.params) {
			console.log('>>' + req.params.repeatsInSet);
			//newSettings.repeatsInSet = req.params.repeatsInSet;
			newSettings.set('repeatsInSet', parseInt(req.params.repeatsInSet,10));
			console.log('>>>>' + newSettings.repeatsInSet);
		}

		newSettings.save().then(function(newSettings) {
			console.log('>> settings saved');
		}, function(err) { console.log('>> error in saving: ' + err); });
		//const results = await newSettings.save();
		console.log('>> settings saved');

	} else {
		console.log(">> empty json");
	}*/

	let returnMessage = 'Ok';

	//var newSettings = results[i];
	//console.log('>>>>');
	//console.log('>> result[i]: '+JSON.stringify(results[i]));
	//console.log('>> newSettings: '+JSON.stringify(newSettings));

	if (Object.keys(req.params).length > 0) {
		console.log(">> json contains data");

		if ('exerciseCount' in req.params) {
			console.log('>>' + req.params.exerciseCount);
			//newSettings.exerciseCount = req.params.exerciseCount;
			results[i].set('exerciseCount', parseInt(req.params.exerciseCount,10));
			console.log('>>>>' + results[i].exerciseCount);
		} else {console.log('>> exerciseCount not found');}
		if ('pauseInSec' in req.params) {
			console.log('>>' + req.params.pauseInSec);
			//newSettings.pauseInSec = req.params.pauseInSec;
			results[i].set('pauseInSec', parseInt(req.params.pauseInSec,10));
			console.log('>>>>' + results[i].pauseInSec);
		}
		if ('repeatsInSet' in req.params) {
			console.log('>>' + req.params.repeatsInSet);
			//newSettings.repeatsInSet = req.params.repeatsInSet;
			results[i].set('repeatsInSet', parseInt(req.params.repeatsInSet,10));
			console.log('>>>>' + results[i].repeatsInSet);
		}

		results[i].save().then(function(newSettings) {
			console.log('>> settings saved');
		}, function(err) {
			console.log('>> error in saving: ' + err);
			returnMessage = 'Failed';
		});
		//const results = await newSettings.save();

	} else {
		console.log(">> empty json, return current settings");

		const query = new Parse.Query('Settings');
		const results = await query.find();
		var i = 0;

		for (i; i < results.length; i++) {
			console.log('>> setting obj found');
			settingsNameVal = results[i].get("name");
			exerciseCountVal = results[i].get("exerciseCount");
			pauseInSecVal = results[i].get("pauseInSec");
			repeatsInSetVal = results[i].get("repeatsInSet");
			var n = settingsNameVal.localeCompare('default');
			if (n == 0) {break;}
			i++;
		}

		returnMessage =  JSON.stringify({name: newSettings.name,
						  exerciseCount: newSettings.exerciseCount,
						  pauseInSec: newSettings.pauseInSec,
						  repeatsInSet: newSettings.repeatsInSet});
	}

	console.log('>> return message: ' + returnMessage);
	return returnMessage;
});