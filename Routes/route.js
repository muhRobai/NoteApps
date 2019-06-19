'use strict'

module.exports = function (app){
	const control = require('./../Controler/noteController');
	const controlCtgry = require('./../Controler/categoryControler');


	//FOR NOTES......................
	//get data
	app.get('/', control.welcome);
	app.get('/note', control.note);
	app.get('/note/:id', control.noteById);

	//post data
	app.post('/note', control.add);

	//update data
	app.patch('/note/:id', control.update);

	//delete data
	app.delete('/note/:id', control.delete);

	//FOR Category

	//GET Catogory
	app.get('/category', controlCtgry.show);
	app.get('/category/:id', controlCtgry.showById);

	//POST Category
	app.post('/category', controlCtgry.add);

	//Update Category
	app.patch('/category/:id', controlCtgry.update);

	//delete category
	app.delete('/category/:id', controlCtgry.delete);
}