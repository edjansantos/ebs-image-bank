module.exports = ((mongoose) => {
    const CategorySchema = require('./category')(mongoose);

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

    return ImageSchema;
});