var express = require('express');
var bodyparser = require('body-parser');
var pg = require('pg').native;
var cors = require('cors');

var app = express();
var port = process.env.PORT || 8080;

var client = new pg.Client("postgres://oylczfiffvqtne:x2KN2xsIf-zmJh6_Q-NAqbAzGS@ec2-50-19-242-27.compute-1.amazonaws.com:5432/dd9ops4afk10cn");
client.connect();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
	extended: true
}));
app.use(cors());

app.use(express.static(__dirname+'/'));

app.get('/get', function(req,res,next){
	var query = get();
	var results = [];

	query.on('row', function(row){
		results.push(row)
	});
	query.on('end', function(){
		res.json(results);
	})

});

app.post('/post/:name/:done', function(req,res,next){
	var name = req.params.name;
	var done = req.params.done;
	add(name, done, res);
	console.log("insert into test (name, done) values ('" + name + "', '"+ done + "');");

});

app.put('/put/:name/:done', function(req,res,next){
	var name = req.params.name;
	var done = req.params.done;
	move(name, done, res);
	console.log("update test set done = " + done + " where name = " + name);

});

function get(){
	return client.query("select * from test");
}

function move(name, done,res){
	client.query("update test set done = " + done + " where name = " + "'" +name+"'", function(err,response){
		if(err){
			res.sendStatus(404);
		}
		else{
			res.sendStatus(200);
		}
	})
}

function add(name, done, res){
	client.query("insert into test (name, done) values ('" + name + "', '" + done +"');", function(err, reponse){
		if(err){
			res.sendStatus(404);
		}
		else{
			res.sendStatus(200);
		};
	});
}

function remove(name,res){
	client.query("delete from test where name = " + "'" +name+"'", function(err,reponse){
		if(err){
			res.sendStatus(404);
		}
		else{
			res.sendStatus(200);
		};
	});
	
}

app.put('/remove/:name', function(req,res,next){
	var name = req.params.name;
	remove(name, res);
	console.log("delete from test where name = " + name);
});

/* Testing functions */
app.get('/hello/:name', function(req,res,next){
	console.log(req.params.name);
	res.send('Why hello ' +req.params.name + '\n');	
});

app.get('/test', function(req,res,next){
	console.log('test');
	res.sendStatus(200);	
});
/* End of tests */

app.listen(port, function () {
	console.log('Example app listening on port ' + port);
});

