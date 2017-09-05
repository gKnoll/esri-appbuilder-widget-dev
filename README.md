# appbuilder-widget-dev
Proposed project structure for local [Web AppBuilder](https://developers.arcgis.com/web-appbuilder) widget development.  

## About
The concept behind this project is to demonstrate a local development environment for web appbuilder widgets. In addition to local widget development, this project structure enables the testing of application configuration. This is achieved via the following workflow.

1. Store the base web appbuilder application in your project as a zip file.
* Develop your custom widgets in the `src\widgets`
* Store your application specific configuration files in `apps\[name]`
* Use Grunt to merge the base application, your custom widgets, and your app specific configuration.

## Requirements
* [node & npm](https://nodejs.org/)

## Usage
* Install global packages with [npm](https://www.npmjs.com)

        npm install -g grunt-cli
* `npm install` - installs the required node packages
* `grunt serve` - runs configured applications on localhost:9004/[app name]
  * See [Gruntfile.js](./Gruntfile.js) for more details
