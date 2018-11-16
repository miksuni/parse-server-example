
//Parse.Cloud.define('hello', function(req, res) {
//  res.success('Hi');
//});

//Parse.Cloud.define('hello', (req) => {
Parse.Cloud.define('hello', async (req) => {
	console.log(req);

    var returnMessage = '...';

    //settingsStr: string = '';
	//settings = { name:'', exerciseCount:'', pauseInSec:'', repeatsInSet:'' };

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

	let returnMessage = 'Ok';

	if (Object.keys(req.params).length > 0) {
		console.log(">> json contains data");

		const query = new Parse.Query('Settings');
		const results = await query.find();
		var i = 0;

		for (i; i < results.length; i++) {
			console.log('>> setting obj found');
			settingsNameVal = results[i].get("name");
			exerciseCountVal = results[i].get("exerciseCount");
			setCountVal = results[i].get("setCountVal");
			pauseInSecVal = results[i].get("pauseInSec");
			repeatsInSetVal = results[i].get("repeatsInSet");
			var n = settingsNameVal.localeCompare('default');
			if (n == 0) {break;}
			i++;
		}

		//var newSettings = new Parse.Object('Settings');
		var newSettings = results[i];

		if ('name' in req.params) {
			console.log('>>' + req.params.name);
			newSettings.set('name', req.params.name);
			console.log('>>>>' + newSettings.name);
		} else {console.log('>> name not found');}

		if ('exerciseCount' in req.params) {
			console.log('>>' + req.params.exerciseCount);
			newSettings.set('exerciseCount', parseInt(req.params.exerciseCount,10));
			console.log('>>>>' + newSettings.exerciseCount);
		} else {console.log('>> exerciseCount not found');}

		if ('setCount' in req.params) {
			console.log('>>' + req.params.setCount);
			newSettings.set('setCount', parseInt(req.params.setCount,10));
			console.log('>>>>' + newSettings.setCount);
		} else {console.log('>> setCount not found');}

		if ('pauseInSec' in req.params) {
			console.log('>>' + req.params.pauseInSec);
			newSettings.set('pauseInSec', parseInt(req.params.pauseInSec,10));
			console.log('>>>>' + newSettings.pauseInSec);
		} else {console.log('>> pauseInSec not found');}

		if ('repeatsInSet' in req.params) {
			console.log('>>' + req.params.repeatsInSet);
			newSettings.set('repeatsInSet', parseInt(req.params.repeatsInSet,10));
			console.log('>>>>' + newSettings.repeatsInSet);
		} else {console.log('>> repeatsInSet not found');}

		newSettings.save().then(function(newSettingsAgain) {
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
			setCountVal = results[i].get("setCount");
			pauseInSecVal = results[i].get("pauseInSec");
			repeatsInSetVal = results[i].get("repeatsInSet");
			var n = settingsNameVal.localeCompare('default');
			if (n == 0) {break;}
			i++;
		}

		returnMessage =  JSON.stringify({name: settingsNameVal,
						  exerciseCount: exerciseCountVal,
						  setCount: setCountVal,
						  pauseInSec: pauseInSecVal,
						  repeatsInSet: repeatsInSetVal});
	}

	console.log('>> return message: ' + returnMessage);
	return returnMessage;
});

Parse.Cloud.define('newTraining', async (req) => {

	let returnMessage = 'Ok';

	if (Object.keys(req.params).length > 0) {
		console.log(">>>> training json contains data");

		var obj = new Parse.Object('Training');

		//if ('date' in req.params) {
		//	console.log('>>' + req.params.date);
		//	obj.set('date', req.params.date);
		//}
		obj.set('date', new Date());
		if ('exercise' in req.params) {
			console.log('>>' + req.params.exercise);

			const query = new Parse.Query('Exercise');
			const results = await query.find();
			var i = 0;

			for (i; i < results.length; i++) {
				console.log('>> iterate exercises...');
				var n = results[i].id.localeCompare(req.params.exercise);
				if (n == 0) {
					console.log('>> exercise found');
					obj.set('exercise', results[i]);
					break;
				}
				i++;
			}
		}
		if ('pauseInSec' in req.params) {
			console.log('>>' + req.params.pauseInSec);
			obj.set('pauseInSec', parseInt(req.params.pauseInSec, 10));
		}
		if ('weightInKg' in req.params) {
			console.log('>>' + req.params.weightInKg);
			obj.set('weightInKg', parseInt(req.params.weightInKg, 10));
		}
		if ('setCount' in req.params) {
			console.log('>>' + req.params.setCount);
			obj.set('setCount', parseInt(req.params.setCount, 10));
		}
		if ('repeatsInSet' in req.params) {
			console.log('>>' + req.params.repeatsInSet);
			obj.set('repeatsInSet', parseInt(req.params.repeatsInSet, 10));
		}
		obj.save().then(function(obj) {
			console.log('>> exercise saved');
		}, function(err) { console.log(err); });
	} else {
		console.log(">> training json does not contain data");
	}
});

Parse.Cloud.define('exercises', async (req) => {

	let returnMessage = 'Ok';

	if (Object.keys(req.params).length > 0) {
		console.log(">> excercise json contains data");
	} else {
		console.log(">> excercise json does not contain data, return current exercises");

		const query = new Parse.Query('Exercise');
		const results = await query.find();
		var i = 0;

		for (i; i < results.length; i++) {
			console.log('>> exercise obj found');
			const name = results[i].get("name");
			const order = results[i].get("order");
			const exerciseId = results[i].get("exerciseId");
			const targetArea = results[i].get("targetArea");
			const pauseInSec = results[i].get("pauseInSec");
			const setCount = results[i].get("setCount");
			const repeatsInSet = results[i].get("repeatsInSet");
			i++;
		}

		returnMessage = JSON.stringify(results);

		console.log('>> return message: ' + returnMessage);
		return returnMessage;
	}
});