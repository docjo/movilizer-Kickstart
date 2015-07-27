# Movilizer Kickstart


> Version: 0.0.1

> Last Update: 27.07.2015

> Author: Jonathan Wildermuth [<jonathan.wildermuth@movilizer.com>]





**Project File Structure**

    |-- README.md
    |-- .bowerrc
    |-- .gitignore
    |-- bower.json
    |-- package.json
    |-- config.json
    |-- Gruntfile.js
    |-- src
        |-- index.html
        |-- cordova.js
        |-- plugins
            |-- Movilizer.js
        |-- js
            |-- app.js
        |-- css
            |-- normalize.css
        |-- sass
            |-- main.scss



## Setting Up
_Skip if nodejs, grunt and bower are installed_

The first thing to do in order to use Grunt is to set up Node.js. > https://nodejs.org/

Once Node.js is installed, install grunt. You may need to use sudo (for OSX, *nix, BSD etc) or run your command shell as Administrator (for Windows) to do this.:

    $ [sudo] npm install -g grunt-cli


Install Bower (optional)

	$ [sudo] npm install -g bower



## Project Setup

### Bower (optional)
**configure bower.json** to add or remove dev/dependencies eg. jquery, underscore ...

run

	$ bower install
	
All bower components are installed in the directory "_src/bower_components_"



### Grunt
**Install grunt modules**

	$ npm install

All node modules are installed in the directory "_node_modules_"

### config.json
- add bower_components paths to "lib_files"
for example:


    "libs_files": [
        "bower_components/jquery/dist/jquery.min.js",
		"..."
  	]

- insert movilizerMDS credentials


	"systemId": "SYSTEM_ID"
	"password": "PASSWORD"
	"pool": "DOCUMENT_POOL"
	"key": "DOCUMENT_KEY"



## Grunt Tasks

All Grunt tasks are defined in the Gruntfile.js



### Start Grunt Sever
run 

	$ grunt server

to start the local webserver (http://localhost:8000/)



### Grunt (default)
run

	$ grunt

to execute the default grunt task ["clean", "sass:dev", "copy", "concat", "uglify", "watch"]



**default task include:**

- clean // Clean up the www folder
- sass:dev // compile sass file and create minified css file
- copy // Copy all necessary project files to deploy
- concat // Concatenate all js source files in js folder
- uglify // Minify the app.js file
- watch // Watch file changes and re-build immediately !

You can install the Live Reload Browser Extension for Chrome: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei.
LiveReload monitors changes in the file system. As soon as you save a file, it is preprocessed as needed, and the browser is refreshed.



### Upload to Movilizer MDS
run

	$ grunt upload
	
will compress your www folder and upload to MovilizerMDS.


**optional**

It's also possible to include the compress and upload task with the default task.
For example:

    grunt.registerTask("default", ["clean", "sass:dev", "copy", "concat", "uglify", "compress", "upload_file", "watch"]);








