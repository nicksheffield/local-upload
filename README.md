# Local-upload


## Install

1. Download from [here](https://github.com/nicksheffield/local-upload/archive/master.zip)
2. Extract the zip
3. Navigate to the `local-upload-master` folder on your command line
4. Run the command `npm install`


## Run
Navigate to the project folder and run `node server`

[Find your local ip address](http://lifehacker.com/5833108/how-to-find-your-local-and-external-ip-address) and give that to the students, plus `:8000`

```
eg. 10.24.45.17:8000
```

## Options

You can use the `-t` or `--title` flag to modify the title displayed on the form
```
eg. node server --title "Assignment 01"
```

You can also use the `-f` or `--folder` flag to modify the upload destination folder
```
eg. node server --folder "../assignments/first"
```

You can also use them both at the same time, in their short forms this time
```
eg. node server -t "Assignment 01" -f "../assignments/first"
```


## Usage
Uploaded files will appear in the `local-upload-master/uploads/` folder, unless otherwise specified by the `-f, --folder` flag