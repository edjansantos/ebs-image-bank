module.exports = (app) => {
    const multer = require('multer'),
        storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, app.ebsSettings.UPLOAD_PATH)
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname.toLowerCase());
            }
        }),
        fs = require('fs'),
        utils = require('./utils')(),
        upload = multer({ storage: storage, fileFilter: (req, file, cb) => {
            if(utils.getAvailableMimetypes().indexOf(file.mimetype) >= 0)
            cb(null, true);
            else
            cb(new Error('I don\'t have a clue!'));
        } }).single('image');

    app.post('/upload', (req, res, next) => {
        try{
            upload(req, res, (err) => {
                if (err) return res.status(500).send({success: false, exception: err});
                const __metadataFilename = utils.generateMetadataFilename(req.file.originalname);

                try {
                    let metadataContent = {};
                    if(req.query) {

                        const __METADATAFIELDS = utils.getCustomFieldsMetadata();

                        __METADATAFIELDS.forEach((field) => {
                            metadataContent[field] = (field === 'tags') ? req.query[field].split(',') : req.query[field];
                        });
                    }

                    fs.writeFileSync(app.ebsSettings.UPLOAD_PATH + __metadataFilename, JSON.stringify(metadataContent), 'utf-8');
                    res.send({success: true});
                } catch(error) {
                    const __IMAGEPATH = app.ebsSettings.UPLOAD_PATH + req.file.originalname,
                          __METADATAPATH = app.ebsSettings.UPLOAD_PATH + __metadataFilename;
                    if (fs.existsSync(__IMAGEPATH)) 
                        fs.unlinkSync(__IMAGEPATH);

                    if (fs.existsSync(__METADATAPATH)) 
                        fs.unlinkSync(__METADATAPATH);

                    res.status(500).send({success: false, exception: error.message});
                }

                
            });
        } catch(error) {
            res.status(500).send({success: false, exception: error.message});
        }
    });
};