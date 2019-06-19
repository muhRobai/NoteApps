'use strict'
const Joi = require('joi');
const response = require('./../Database/response');
const con = require('./../Database/connection');
const moment = require('moment');

exports.welcome = function (req, res){
	response.ok('welcome',res);
}

exports.note = function (req, res){
	var sql = "select id, title, note, date_note as date, category from note join category on note.id_category = category.id_category";

	con.query (sql, function (error, rows, field){
		if (error) {
			console.log(error);
		}else{
			response.ok (rows, res);
		}
	});
}

exports.noteById = function (req, res){
	let id = req.params.id;
	var sql = `select id, title, note, date_note as date, category from note join category on note.id_category = category.id_category where id= ${id}`;
		con.query(sql, function (error, rows, field){
			if (error) {
				console.log(error);
			}else{

				if (rows == "") {
					res.send({
					 message: "Data not Found!"
					});
				}else{
					response.ok(rows, res);	
				}
				
			}
		});
	}

exports.add = function (req, res){
	
	let { title, note, date, id_category } = req.body;	

	const schema = {
		title : Joi.string().required(),
		note : Joi.string().required(),
		date : Joi.date().required(),
		id_category : Joi.number().required()
	};

	const result = Joi.validate(req.body, schema);

	if (result.error) {
		res.status(400).send(result.error.details[0].message);
	}else{
		con.query(`insert into note set title=?, note=?,date_note=?,id_category=?`, [title,note,date,id_category], function (error, rows, field){
		if (error) {
			throw error;
		}else{
			return res.send({
				error: false,
				data: rows,
				message: 'data saved!'	
			});
		}
		});	
	}
	
}

exports.update = function (req, res){
	
	let id = req.params.id;
	//var arrbulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
	var day = new Date().getDate();
	var month = new Date().getMonth();
	var year = new Date().getFullYear();

	var date = `${year}-${month}-${day}`
	let title = req.body.title;
	let note = req.body.note;
	let id_category = req.body.id_category;

	//let { title, note, id_category } = req.body;

	if (title == undefined) {
		var sql = `update note set note = "${note}", update_date = "${date}", id_category = "${id_category}" where id = ${id}`;
	}else if(note == undefined){
		var sql = `update note set title = "${title}", update_date = "${date}", id_category = "${id_category}" where id = ${id}`;
	}else{
		var  sql = `Update note set title = "${title}", note = "${note}", update_date = "${date}", id_category = "${id_category}" where id = ${id}`;

	}
	
	const scheme = {
		title : Joi.string(),
		note : Joi.string(),
		//date : Joi.date(),
		id_category : Joi.number().required()
	}

	const result = Joi.validate(req.body, scheme);

	if (result.error) {
		res.status(400).send(result.error.details[0].message);
	}else{
		con.query(sql, function (error, rows, fields){
		if (error) {
			throw error;
		}else{
			return res.send({
				error: false,
				data: rows,
				message: "data has been update!"
			});
		}
	});
	}

	
}

exports.delete = function (req, res){
	let id = req.params.id;

	const schema = {
		id : Joi.number().required()
	}

	con.query(`select * from note where id = ${id}`, function (error, rows){
		if (rows == "") {
			res.send({
				message: " data not Found!"
			});
		}else{
			con.query(`Delete from note where id = ${id}`, function (error, rows, fields){
				if (error) {
					throw error;
				}else{
					return res.send({
						error: false,
						data: rows,
						message: "data has been delete!"
					});
				}
			});	

		}
	});

		
}