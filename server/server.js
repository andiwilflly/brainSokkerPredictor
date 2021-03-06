const path = require('path');
const Express = require('express');
const React = require('react');
import handleRender from '../built/server.js';

const MongoClient = require('mongodb').MongoClient;
// mongodb://andiwillfly:ward121314@ds127854.mlab.com:27854/net
MongoClient.connect("mongodb://andiwillfly:ward121314@ds127854.mlab.com:27854/net", function (err, DB) {
	if(err) throw err;

	const app = Express();
	// Serve built files with express static files middleware
	console.log('==========3', path.join(__dirname, 'built'));
	app.use('/built', Express.static(path.join(__dirname, '../built')));

	// Serve normal requests with our handleRender function
	app.use('/static', Express.static(path.join(__dirname, '../static')));


	var request = require('request');
	var fs = require('fs');
	var brain = require('brain');
	var htmlToJson = require("html-to-json");
	const $ = require('cheerio');


	app.use('/players', function (req, res) {
		const playersCollection = DB.collection('players');
		playersCollection.find().toArray(function(err, players) {
			res.send(players);
		});
	});


	app.post('/learn_save_player', function (req, res) {
		//const playersCollection = DB.collection('players');

		console.log(req, 'POST??');

	});


	app.use('/keepers', function (req, res) {
		let foundPlayers = [];
		const playersCollection = DB.collection('players');

		playersCollection.find({ $where: "this.keeper > 0.04"}).toArray(function(err, dbPlayers) {
			DB.collection('keepers', function (err, collection) {

				dbPlayers.forEach((dbPlayer, index)=> {
					if(!dbPlayer.age) return;
					collection.findOne({ _id: dbPlayer.name }).then((dbFoundPlayer)=> {
						if(!dbFoundPlayer) {
							console.log('====== SAVE [KEEPER] TO MONGO: ', dbPlayer.name, ' =======');
							collection.save({
								_id: dbPlayer.name,
								...Object.assign(dbPlayer, dbPlayers[index])
							});
						}
					});

					if(dbPlayer.age) {
						const input = Object.assign(dbPlayer, dbPlayers[index]);
						const output = makePrediction(input);

						console.log("<--x- <--x- <--x- 4 dbPlayer", dbPlayer);
						console.log("<--x- <--x- <--x- 5 dbPlayers[index]", dbPlayers[index]);

						console.log("<--x- <--x- <--x- 6 assign", input);
						console.log("<--x- <--x- <--x- 7 output", output);

						foundPlayers.push({
							input,
							output
						});
					}
					console.log("<--x- <--x- <--x- 8 push", foundPlayers);
				});
			});

			res.send(foundPlayers);
		});
	});


	function makePrediction({
		                        keeper,
		                        pace,
		                        passing,

		                        // not important
		                        stamina,
		                        defender,
		                        technique,
		                        playmaker,
		                        striker }) {
		let evaluation = 0;

		// keeper
		evaluation += inRange(keeper, 0.4) ? 0.3 : 0; // Good
		evaluation += inRange(keeper, 0.2, 0.3) ? 0.2 : 0; // Middle
		evaluation += inRange(keeper, 0.01, 0.19) ? 0.1 : 0; // Bad

		console.log("<--x- <--x- <--x- 1", evaluation);

		// pace
		evaluation += inRange(pace, 0.4) ? 0.3 : 0; // Good
		evaluation += inRange(pace, 0.2, 0.3) ? 0.2 : 0; // Middle
		evaluation += inRange(pace, 0.01, 0.19) ? 0.1 : 0; // Bad
		console.log("<--x- <--x- <--x- 2", evaluation);

		// passing
		evaluation += inRange(passing, 0.4) ? 0.3 : 0; // Good

		evaluation += inRange(passing, 0.2, 0.3) ? 0.2 : 0; // Middle

		evaluation += inRange(passing, 0.01, 0.19) ? 0.1 : 0; // Bad
		console.log("<--x- <--x- <--x- 3", evaluation,  { isGoodPlayer: evaluation });

		return { isGoodPlayer: evaluation }
	}

	function inRange(number=0, min, max=1) {
		return (number >= min) && (number <= max);
	}


	app.use('/parse', function (req, res) {
		request('http://sokker.worldofbarter.com/CurrentTransfers', function (error, response, body) {

			htmlToJson.parse(body, ['.table.table-striped tr',
				function ($item) { return $item; },
				function ($items) {
					const playersData = [];
					const promisePlayerDataArray = [];
					$items.forEach(function(item) {
						const tds = $(item).find("td");

						promisePlayerDataArray.push(new Promise((resolve, reject)=> {
							request(`http://online.sokker.org/player/PID/${$(tds[0]).text().trim()}`, function (error, response, body) {

								htmlToJson.parse(body, ['.table.table-condensed.table-skills td',
									function ($item) { return $item; },
									function (playerSkills) {
										let skill1 = $(playerSkills[0]).text().trim().split(']');
										let skill2 = $(playerSkills[1]).text().trim().split(']');
										let skill3 = $(playerSkills[2]).text().trim().split(']');
										let skill4 = $(playerSkills[3]).text().trim().split(']');
										let skill5 = $(playerSkills[4]).text().trim().split(']');
										let skill6 = $(playerSkills[5]).text().trim().split(']');
										let skill7 = $(playerSkills[6]).text().trim().split(']');
										let skill8 = $(playerSkills[7]).text().trim().split(']');
										return {
											stamina: Number(skill1[0].replace('[', '').split(' ')[1]) / 100,
											keeper: Number(skill2[0].replace('[', '').split(' ')[1]) / 100,
											pace: Number(skill3[0].replace('[', '').split(' ')[1]) / 100,
											defender: Number(skill4[0].replace('[', '').split(' ')[1]) / 100,
											technique: Number(skill5[0].replace('[', '').split(' ')[1]) / 100,
											playmaker: Number(skill6[0].replace('[', '').split(' ')[1]) / 100,
											passing: Number(skill7[0].replace('[', '').split(' ')[1]) / 100,
											striker: Number(skill8[0].replace('[', '').split(' ')[1]) / 100
										};
									}])
									.done(function (player) {
										resolve(player);
									});
							});
						}));

						playersData.push({
							id: $(tds[0]).text().trim(),
							name: $(tds[1]).text().trim(),
							age: Number($(tds[2]).text().trim()) / 100,
							estimated: Math.round(Number($(tds[3]).text().replace('€', '').replace(/ /g, '')) *6.4) / 10000000,
							current: Math.round(Number($(tds[4]).text().replace('€', '').replace(/ /g, '')) * 6.4) / 10000000,
							profit: Math.round(Number($(tds[5]).text().replace('€', '').replace(/ /g, '')) * 6.4) / 10000000,
						});
					});
					return { playersData, promisePlayerDataArray };
				}])
				.done(function ({ playersData, promisePlayerDataArray }) {
					Promise.all(promisePlayerDataArray).then(players => {

						DB.collection('players', function (err, collection) {

							const DATA = [];
							playersData.forEach((predictor, index)=> {
								// TODO: findOne
								if(!predictor.age) return;
								collection.findOne({ _id: predictor.name }).then((player)=> {
									if(!player) {
										console.log('====== SAVE [PLAYER] TO MONGO: ', predictor.name, ' =======');
										collection.save({
											_id: predictor.name,
											...Object.assign(predictor, players[index])
										});
									}
								});

								if(predictor.age)
									DATA.push({
										input: Object.assign(predictor, players[index]),
										output: { status: 0 }
									});
							});
							playersData = JSON.stringify(DATA, null, 4);
							//fs.writeFileSync(__dirname + `/_data/${Date.now()}_items.json`, playersData);

							res.send(playersData);
						});
					});
				}, function (err) {
					console.log(err, 'ERR');
					// Handle error
				});
		});
	});

	app.get('*', handleRender);


	app.listen(3000);
	console.log('=== Go to http://localhost:3000 ===');
});
