const pug = require('pug');
const express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

function LegacyWebNavPage() {
    this.app = express();
    this.app.set('view engine', 'pug');
    // for parsing application/json
    this.app.use(bodyParser.json());

    // for parsing application/xwww-
    this.app.use(bodyParser.urlencoded({ extended: true }));
    //form-urlencoded

    // for parsing multipart/form-data
    this.app.use(upload.array());
    this.app.use(express.static('public'));
}

function genPage(pageData, req, res, bodyData) {
    let routeData = Object.assign({}, pageData, bodyData);
    // Generate any dynamic text
    routeData.parts.forEach(part => {
	    if (part.type == 'generated') {
	      part.type = 'paragraph';
	      part.text = part.content(req);
	    }
    });
    res.render('navpage', routeData);
}

LegacyWebNavPage.prototype.addGet = function(route, pageData, bodyData) {
    this.app.get(route, function(req, res) {
	    genPage(pageData, req, res, bodyData);
    });
}

LegacyWebNavPage.prototype.addPost = function(route, pageData, bodyData) {
    this.app.post(route, function(req, res) {
	    genPage(pageData, req, res, bodyData);
    });
}

LegacyWebNavPage.prototype.startServer = function(port) {
    this.app.listen(port, () => {
	    console.log(`Example app listening at http://localhost:${port}`)
    });
}

module.exports = LegacyWebNavPage;
