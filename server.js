const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
	var now = new Date().toString();

	var log = `${now}: ${req.method} ${req.url}`;

	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('unable to append to server.log.');
		}
	});

	next();
})

//maintenance mode
// app.use((req, res, next) =>{
// 	res.render('maintenance.hbs');
// });

//put this here to stop help.html working
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', ()=>{
 return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

//root route

app.get('/', (req, res) => {

	res.render('home.hbs',{welcome: "Welcome you!", pageTitle:'home'} );

	//res.send('<h1>hello Express!</h1>');

	// res.send({
	// 	name: 'Annie',
	// 	likes: ['eating', 
	// 	'drinking', 
	// 	'sleeping'] 
	// });

});

app.get('/about', (req,res) => {
	res.render('about.hbs', {pageTitle: 'About Page'});
});

app.get('/bad', (req,res) => {
	res.send({errorMessage:"You rock job"});
});


app.listen(3000, () => {
	console.log('Server is up on port 3000')
});

