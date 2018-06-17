module.exports = (app) => {
    const multer = require('multer'),
        db = require('./database'),
        uuidv1 = require('uuid/v1'),
        storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, app.ebsSettings.UPLOAD_PATH)
            },
            filename: function (req, file, cb) {
                const _filename = file.originalname.toLowerCase(),
                    _arrayFileName = _filename.split('.');
                cb(null, `${uuidv1()}.${_arrayFileName[_arrayFileName.length - 1]}`);
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

                try {
                    let metadataContent = {};
                    if(req.query) {
                        metadataContent = {
                            filename: req.file.filename,
                            tags: (req.query.tags ? req.query.tags.split(',') : undefined),
                            description: req.query.description
                        }

                        const ImageSchema = require('./models/image')(db),
                        ImageModel = new (db.model('Image', ImageSchema))(metadataContent);

                        ImageModel.save();
                    }

                    res.send({success: true});
                } catch(error) {
                    const __IMAGEPATH = app.ebsSettings.UPLOAD_PATH + req.file.originalname;
                    if (fs.existsSync(__IMAGEPATH)) 
                        fs.unlinkSync(__IMAGEPATH);

                    res.status(500).send({success: false, exception: error.message});
                }

                
            });
        } catch(error) {
            res.status(500).send({success: false, exception: error.message});
        }
    });
};