var express = require('express')
var multer = require('multer')
var bodyParser = require('body-parser')
var mkdirp = require('mkdirp')
var fs = require('fs')
var upload = multer({ dest: './tmp/' })

mkdirp(__dirname+'/uploads', function(err) { if(err) console.error(err) })
mkdirp(__dirname+'/tmp',     function(err) { if(err) console.error(err) })


var app = express()

app.listen(8000)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html')
})

app.post('/upload', upload.single('file'), function(req, res) {
	fs.rename(req.file.path, __dirname + '/uploads/' + req.file.originalname, function(err) {
		console.log('done!')
		
		res.redirect('/')
	})
})