'use strict'

const resp = require('./../Database/response');
const con = require('./../Database/connection');

exports.show = function (req, res){
	con.query('select * from category', function (error, rows, field){
		if (error) {
			console.log(error);
		}else{
			resp.ok(rows, res);
		}
	});
}

exports.showById = function (req, res){
	con.query(`select * from category where id_category = ${req.params.id}`, function (error, rows, fiels){
		if (error) {
			console.log(error);
		}else{
			if (rows == "") {
				res.send({
					message: "data not found!"
				});

			}else{
				resp.ok(rows, res);	
			}
			
		}
	});
}

exports.add = function (req, res){
	let category = req.body.category;

	con.query('insert into category set category=?', [category], function (error, rows, field){
		if (error) {
			console.log(error);
		}else{
			return res.send({
				error: false,
				data: rows,
				message: "Category has been saved!"
			});
		}
	});
}

exports.update = function(req, res){
	let id = req.params.id;
	let category = req.body.category;

	var sql = `select * from category where id_category = ${id}`;

	con.query(sql, function (error, rows){
		if (rows == "") {
			res.send({
				message: "data not found!"
			});
		}else{
			con.query(`update category set category="${category}" where id_category = ${id}`, function (error, rows, field){
				if (error) {
					console.log(error);
				}else{
					return res.send({
						error: false,
						data: rows,
						message: "Category has been update"
					});
				}
			});
		}
	});

	
}

exports.delete = function(req, res){
	let id = req.params.id;

	var sql = `select * from note where id_category = ${id}`

	con.query(sql, function (error, rows){
		if (rows != "") {
			res.send({
				message: "category using on note, delete note first!"
			});
		}else{
			con.query(`delete from category where id_category = ${id}`, function (error, rows, field){
				if (error) {
					console.log(error);
				}else{
					return res.send({
						error: false,
						message: "Category has been delete"
					});
				}
			});
		}
	});

	
}