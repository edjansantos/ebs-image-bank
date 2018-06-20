module.exports = (() => {
    const mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');
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

    ImageSchema.plugin(mongoosePaginate);

    return {model: mongoose.model('Image', ImageSchema), schema: ImageSchema };
})();