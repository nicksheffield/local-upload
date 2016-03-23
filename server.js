// Dependencies
// ---------------------------------------------
var fs           = require('fs')
var path         = require('path')
var chalk        = require('chalk')
var multer       = require('multer')
var rimraf       = require('rimraf')
var mkdirp       = require('mkdirp')
var express      = require('express')
var program      = require('commander')
var bodyParser   = require('body-parser')

var config       = require('./src/config.json')



// Command Line Flags
// ---------------------------------------------
program
	.version('0.0.1')
	.option('-f, --folder [name]', 'Destination of uploaded files. Defaults to uploads/')
	.option('-t, --title [name]', 'Heading to appear in the browser')
	.parse(process.argv)



// Create directories
// ---------------------------------------------
// delete the entire /tmp folder
rimraf(__dirname+'/tmp', function(err) {
	if(err) console.log(chalk.red('[ERROR] ') + err)
	
	// then recreate the /tmp folder empty
	mkdirp(__dirname+'/tmp', function(err) { if(err) console.log(chalk.red('[ERROR] ') + err) })
})

// create the uploads folder
mkdirp(__dirname+'/uploads', function(err) { if(err) console.log(chalk.red('[ERROR] ') + err) })



// Create web server
// ---------------------------------------------
var app = express()
app.listen(8000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var upload  = multer({ dest: './tmp/' })

// Handle default request
app.use(express.static('./src'))
// app.get('/', function(req, res) {
// 	res.sendFile(__dirname + '/src/index.html')
// })

// Handle upload request
app.post('/upload', upload.single('file'), function(req, res) {
	
	var dest = config.upload_directory + '/' + req.body.folder
	var newName = (new Date().valueOf()) + '__' + req.file.originalname
	var newPath = dest + '/' + newName
	
	console.log('newPath', newPath)

	
	// check if the destination folder exists
	fs.stat(dest, function(err, stat) {
		// if it does
		if(stat) {
			moveFile()
		// if it doesn't
		} else {
			mkdirp(dest, function(err) {
				moveFile()
			})
		}
		
		function moveFile() {
			fs.rename(req.file.path, newPath, function(err) {
				console.log('  ', dateStamp(), chalk.green(newName))
				res.send(newName)
			})
		}
	})
	
	
})

function z(n){ return n < 10 ? '0' + n : n }

function dateStamp() {
	var now = new Date()
	var time = '['+[z(now.getHours()), z(now.getMinutes()), z(now.getSeconds())].join(':')+']'
	return chalk.cyan(time)
}



// Command Line Logs
// ---------------------------------------------
console.log('---------------------------------------------------')
console.log(dateStamp(), 'local-upload server running!')
console.log('Your address is', chalk.underline('http://' + require('os').networkInterfaces().en0[1].address + ':8000/'))
console.log('Destination:', chalk.red(config.upload_directory))
console.log('Press Ctrl+C to exit')
console.log(' ')
console.log('Uploaded files:')

process.on('SIGINT', function() {	
	console.log('---------------------------------------------------')
	process.exit()
})