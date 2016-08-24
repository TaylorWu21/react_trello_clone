var express = require('express');
var router = express.Router();
var Board = require('../models/board');

// GET shows all boards
router.get('/', function(req, res) {
	Board.find( function(err, boards) {
		res.json(boards);
	});
});

router.get('/:id', function(req, res) {
	res.render('board');
});

// POST creates a board
router.post('/', function(req, res) {
	new Board({
		name: req.body.name
	}).save( function(err, board) {
		res.json(board);
	});
});

// PUT/:id updates a board
router.put('/:id', function(req, res) {
	Board.findByIdAndUpdate(
		req.params.id,
		{ $set: {name: req.body.name, description: req.body.description}},
		function(err, board) {
			res.json(board);
		}
	);
})

// DELETE/:id deletes a board
router.delete('/:id', function(req, res) {
	Board.findById(req.params.id, function(err, board) {
		board.remove();
		res.status(200).send({success: true});
	});
});

module.exports = router;