// Dependencies
// ---------------------------------------------
var fs           = require('fs')
var path         = require('path')
var chalk        = require('chalk')
var multer       = require('multer')
var mkdirp       = require('mkdirp')
var express      = require('express')
var program      = require('commander')
var bodyParser   = require('body-parser')
var session      = require('express-session')



// Command Line Flags
// ---------------------------------------------
program
	.version('0.0.1')
	.option('-f, --folder [name]', 'Destination of uploaded files. Defaults to uploads/')
	.option('-t, --title [name]', 'Heading to appear in the browser')
	.parse(process.argv)
	
var dest = program.folder ? path.normalize(__dirname + '/' + program.folder) + '/' : __dirname + '/uploads/'



// Create directories
// ---------------------------------------------
mkdirp(__dirname+'/uploads', function(err) { if(err) console.error(err) })
mkdirp(__dirname+'/tmp',     function(err) { if(err) console.error(err) })



// Create web server
// ---------------------------------------------
var app = express()
app.listen(8000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({ secret: 'keyboard cat' }))
app.set('view engine', 'ejs')
app.set('views', __dirname)

var upload  = multer({ dest: './tmp/' })

// Handle default request
app.get('/', function(req, res) {
	// res.sendFile(__dirname + '/index.html')
	res.render('index', {
		title: program.title ? program.title : '',
		message: req.session.message
	})
	
	req.session.destroy()
})

// Handle upload request
app.post('/upload', upload.single('file'), function(req, res) {
	var newPath = dest + new Date().valueOf() + '__' + req.file.originalname
	
	fs.rename(req.file.path, newPath, function(err) {
		console.log(dateStamp(), chalk.green(path.parse(newPath).base))
		req.session.message = path.parse(newPath).base + ' uploaded!'
		res.redirect('/')
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
console.log(dateStamp(), 'local-upload server running!')
console.log('           Destination:', chalk.red(dest), '\n')
console.log('           Uploaded files:')