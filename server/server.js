const path = require('path');
const Express = require('express');
const React = require('react');
import handleRender from '../built/server.js';


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

					const DATA = [];
					playersData.forEach((predictor, index)=> {
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
			}, function (err) {
				console.log(err, 'ERR');
				// Handle error
			});
	});
});

app.get('*', handleRender);


app.listen(3000);
console.log('=== Go to http://localhost:3000 ===');