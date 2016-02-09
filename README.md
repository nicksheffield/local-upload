# Local-upload


## Install

1. Download from [here](https://github.com/nicksheffield/local-upload/archive/master.zip)
2. Extract the zip
3. Navigate to the `local-upload` folder on your command line
4. Run the command `npm install`


## Run
Navigate to the project folder and run `node server`

[Find your local ip address](http://lifehacker.com/5833108/how-to-find-your-local-and-external-ip-address) and give that to the students, plus `:8000`

```
eg. 10.24.45.17:8000
```

It is also possible to set an alternate upload path, and set a title to be displayed on the page. Using the `--help` flag shows us these options, or just read below.

```
node server --help

  Usage: server [options]

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -f, --folder [name]  Destination of uploaded files. Defaults to uploads/
    -t, --title [name]   Heading to appear in the browser
```


## Usage
Uploaded files will appear in the `uploads/` folder