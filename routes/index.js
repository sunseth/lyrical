var express = require('express');
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable');
var Song = require('../models/song.js');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index.handlebars');
});

router.get('/upload', function(req, res){
	res.render('upload.handlebars');
})

router.get('/question', function(req, res){
	Song.find({difficulty: req.query.difficulty}, function(err, songs){
		var songIndex = Math.floor(Math.random() * songs.length);
		var songIndexBank = [];
		while (songIndexBank.length < 3){
			var bankIndex = Math.floor(Math.random() * songs.length);
			if (!(songIndexBank.indexOf(bankIndex) + 1) && bankIndex != songIndex){
				songIndexBank.push(bankIndex);
			}
		}
		var song = songs[songIndex];
		var songLines = song.lines;

		var lineIndex = Math.floor(Math.random() * songLines.length - 4);
		if (lineIndex < 0){
			lineIndex = 0;
		}
		var question = songLines.slice(lineIndex, lineIndex + 3);
		var answer = songLines[lineIndex + 3];
		
		var choices = {};
		var choiceIndex = Math.floor(Math.random() * 4 + 1);
		var answerNum = choiceIndex;
		choices[choiceIndex] = answer;
		for(var i = 0; i < 3; i++){
			var indexSong = songs[songIndexBank[i]];
			var indexLine = Math.floor(Math.random() * indexSong.lines.length);
			var line = indexSong.lines[indexLine];
			
			choiceIndex = ((choiceIndex % 4) + 1);
			choices[choiceIndex] = line; 
		}
		var response = {
			question: question,
			choices: choices,
			answer: {
				number: answerNum,
				line: answer
			}
		}
		res.json(response);
	});
});

router.post('/upload', function(req, res){
	var form = new formidable.IncomingForm();
	var songObj;
	form.parse(req, function(err, fields, files){
		songObj = {
		    name : fields.name,
		    artist : fields.artist,
		    lines : fields.lines.split('\r\n'),
		    difficulty : fields.difficulty
		}
		Song.create(songObj);
		res.end();
	});
});

module.exports = router;
