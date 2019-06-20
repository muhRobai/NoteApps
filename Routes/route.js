'use strict'

module.exports = function (app){
	const control = require('./../Controler/noteController');
	const controlCategory = require('./../Controler/categoryControler');

	app.get('/', control.welcome);
	app.get('/notes', control.note);
	app.get('/notes/:id', control.noteById);
	app.post('/notes', control.add);
	app.patch('/notes/:id', control.update);
	app.delete('/notes/:id', control.delete);
	app.get('/category', controlCategory.show);
	app.get('/category/:id', controlCategory.showById);
	app.post('/category', controlCategory.add);
	app.patch('/category/:id', controlCategory.update);
	app.delete('/category/:id', controlCategory.delete);
}