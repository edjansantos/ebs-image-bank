module.exports = (() => {
    const mongoose = require('mongoose');
    const CategorySchema = require('./category').schema;

    const ImageSchema = new mongoose.Schema({
        category: {
            type: CategorySchema,
            required: false
        },
        tags: {
            type: [{
                type: String
            }],
            required: true
        },
        description: {
            type: String
        },
        filename: {
            type: String,
            required: true
        }
    });

    return {model: mongoose.model('Image', ImageSchema), schema: ImageSchema };
})();