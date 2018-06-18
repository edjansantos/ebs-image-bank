module.exports = (app) => {

    const fs = require('fs'),
    Image = require('./models/image'),
    utils = require('./utils')();

    const _getMetadataContent = (filename) => {
        const __RELATIVEMETADATAFILEPATH = app.ebsSettings.UPLOAD_PATH + utils.generateMetadataFilename(filename);

        if(fs.existsSync(__RELATIVEMETADATAFILEPATH)) {
            return JSON.parse(fs.readFileSync(__RELATIVEMETADATAFILEPATH, 'utf-8'));
        } else {
            return undefined;
        }
    };

    const _getImage = (filename) => {
        const __RELATIVEFILEPATH = app.ebsSettings.UPLOAD_PATH + filename;

        return fs.readFileSync(__RELATIVEFILEPATH);
    };


    app.get('/images/thumb/:filename', (req, res, next) => {
        try {
            const __FILENAME = req.params.filename,
                sharp = require('sharp');

            const __WIDTH = req.query.width ? parseInt(req.query.width) : utils.getDefaultThumbSize().width,
                 __HEIGHT = req.query.height ?  parseInt(req.query.height) : undefined; 
            res.type('image/png');
            sharp(_getImage(__FILENAME)).resize(__WIDTH, __HEIGHT).toBuffer().then((data) => {
                res.send(data);
            });
        } catch(error) {
            res.type('json');
            res.status(500).send({success: false, exception: error.message});
        }
    });
    
    app.get('/images/get/:filename', (req, res, next) => {

        try {
            const __FILENAME = req.params.filename,
                 __FULLFILEPATH = __dirname + '/'+ app.ebsSettings.UPLOAD_FOLDER + __FILENAME,
                 __RELATIVEFILEPATH = app.ebsSettings.UPLOAD_PATH + __FILENAME;

            if (!fs.existsSync(__RELATIVEFILEPATH)) {
                res.status(404).send();
            } else {
                if(req.query.metadata != undefined) {
                    const __IMAGEDATA = _getImage(__FILENAME);

                    const ImageModel = Image.model;
                    
                    ImageModel.where({filename: __FILENAME}).findOne((err, doc) => {
                            res.send({
                                "metadata": {
                                    description: doc.description,
                                    tags: doc.tags
                                },                        
                                "image": new Buffer(__IMAGEDATA).toString('base64')
                            });
                        });
                } else {
                    res.contentType('image/jpeg');
                    if(req.query.forceDownload != undefined) res.set("Content-Type", "application/octet-stream");
                    res.sendFile(__FULLFILEPATH);
                }
            }
        } catch(error) {
            res.status(500).send({success: false, exception: error.message});
        }
    });

    app.get('/images/search', (req, res, next) => {
        try {
            if(!req.query.query) {
                res.status(401).send({success: false, exception: "Parametros obrigatórios não informados"});
            } else {
                const ImageModel = Image.model;
                ImageModel.find({$or:[{description: { $regex: `.*^${req.query.query}.*`, '$options' : 'i' }}, {tags: { $regex: `.*^${req.query.query}.*`, '$options' : 'i' }}]}, '_id description tags',(err, docs) => {
                    res.status(200).send({success: true, result: docs});
                });
            }
        } catch(error) {
            res.status(500).send({success: false, exception: error.message});
        }
    });

    app.get('/images/list', (req, res, next) => {
        const path = require('path'),
            __IMAGESFOLDER = app.ebsSettings.UPLOAD_PATH;

        let _filesList = [];

        const __FILELIST = fs.readdirSync(__IMAGESFOLDER);
        
        __FILELIST.forEach(function (file) {
                if (utils.getAvailableExtensions().indexOf(path.extname(file).toLowerCase().replace('.','')) >= 0) {
                    _filesList.push({filename: file, metadata: _getMetadataContent(file)});
                }
            });

        res.send({"images":_filesList});
    });    
};