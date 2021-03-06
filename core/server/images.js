module.exports = (app) => {

    const fs = require('fs'),
        Image = require('./models/image'),
        utils = require('./utils')();

    const _getMetadataContent = (filename) => {
        const __RELATIVEMETADATAFILEPATH = app.ebsSettings.UPLOAD_PATH + utils.generateMetadataFilename(filename);

        if (fs.existsSync(__RELATIVEMETADATAFILEPATH)) {
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
                __HEIGHT = req.query.height ? parseInt(req.query.height) : undefined;
            res.type('image/png');
            sharp(_getImage(__FILENAME)).resize(__WIDTH, __HEIGHT).toBuffer().then((data) => {
                res.send(data);
            });
        } catch (error) {
            res.type('json');
            res.status(500).send({ success: false, exception: error.message });
        }
    });

    app.get('/images/get/:filename', (req, res, next) => {

        try {
            const __FILENAME = req.params.filename,
                __FULLFILEPATH = __dirname + '/' + app.ebsSettings.UPLOAD_FOLDER + __FILENAME,
                __RELATIVEFILEPATH = app.ebsSettings.UPLOAD_PATH + __FILENAME;

            if (!fs.existsSync(__RELATIVEFILEPATH)) {
                res.status(404).send();
            } else {
                if (req.query.metadata != undefined) {
                    const __IMAGEDATA = _getImage(__FILENAME);

                    const ImageModel = Image.model;

                    ImageModel.where({ filename: __FILENAME }).findOne((err, doc) => {
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
                    if (req.query.forceDownload != undefined) res.set("Content-Type", "application/octet-stream");
                    res.sendFile(__FULLFILEPATH);
                }
            }
        } catch (error) {
            res.status(500).send({ success: false, exception: error.message });
        }
    });

    app.get('/images/search', (req, res, next) => {
        try {
            const _page = req.query.page ? req.query.page : 1;

            let _query = {};

            if (req.query.query) {
                _query = { $or: [{ tags: { $regex: `.*^${req.query.query}.*`, '$options': 'i' } }, { description: { $regex: `.*^${req.query.query}.*`, '$options': 'i' } }] };
            }
            const ImageModel = Image.model;
            ImageModel.paginate(_query, { select: '_id description tags filename', page: _page, limit: 10 }, (err, result) => {
                let _filesList = [];
                result.docs.forEach(function (file) {
                    _filesList.push({
                        filename: file.filename,
                        description: file.description,
                        tags: file.tags
                    });
                });

                res.send({
                    "images": _filesList, pagination: {
                        page: result.page,
                        pages: result.pages,
                        total: result.total
                    }
                });
            });
            // }
        } catch (error) {
            res.status(500).send({ success: false, exception: error.message });
        }
    });

    app.get('/images/list', (req, res, next) => {
        const _page = req.query.page ? req.query.page : 1;
        let _filesList = [];

        const ImageModel = Image.model;

        ImageModel.paginate({}, { select: '_id description tags filename', page: _page, limit: 10 }, function (err, result) {
            result.docs.forEach(function (file) {
                _filesList.push({
                    filename: file.filename,
                    description: file.description,
                    tags: file.tags
                });
            });

            res.status(200).send({
                "images": _filesList, pagination: {
                    page: result.page,
                    pages: result.pages,
                    total: result.total
                }
            });
        });
    });
};