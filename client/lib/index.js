// @SOURCE: https://github.com/harthur/brain
window.brain = require('brain');
const _ = require('lodash');
const $ = require('jquery');
import data from "./data.json";

var net = new brain.NeuralNetwork();

net.train([
	{input: [0, 0], output: [0]},
	{input: [0, 11], output: [11]},
	{input: [11, 0], output: [11]},
	{input: [11, 11], output: [0]}
], {
	//hiddenLayers: [4],
	//errorThresh: 0.005,  // error threshold to reach
	//iterations: 200,   // maximum training iterations
	log: true,           // console.log() progress periodically
	logPeriod: 1000,       // number of iterations between logging
	//learningRate: 0.3    // learning rate
});


var output = net.run([1, 1]);  // [0.987]


const formatted = _.map(data, (player)=> {
	return {
		input: _.map(
			player,
			(field, fieldName)=> {
				return { [fieldName]: Number.isInteger(field) ? field / 1000000 : field };
			}),
		output: { price: 32 }
	};
});


/*window.fetch('http://sokker.worldofbarter.com/CurrentTransfers', {
	mode: 'no-cors',
	header: {
		// 'Access-Control-Allow-Origin':'*',
		'origin': 'sokker.worldofbarter.com'
	}
})
	.then((response)=> {
		console.log(response);
		return response;
	})
	.then(function(response) {

	}
);*/

$.ajax({
	url: 'http://sokker.worldofbarter.com/CurrentTransfers',
	crossDomain: true,
	dataType: 'html'
}).done((r)=> {
	console.log('resp', r);
}).fail((e)=> {
	console.log('ERR', e);
});

console.log('23');


