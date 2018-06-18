module.exports = (() => {
    const mongoose = require('mongoose'),
    db = mongoose.connection;

    db.on('error', console.error);
    db.once('open', function() {
        console.log('Conectado ao MongoDB.');

    });

    mongoose.connect('mongodb://localhost/ebs-image-bank', err => {
        if(err) throw err;
    });

    return mongoose;
})();