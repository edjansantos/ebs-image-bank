module.exports = (() => {
  const mongoose = require('mongoose');

    const CategorySchema = new mongoose.Schema({
        name: {
          type: String,
          required: true
        }
      });

    return {model: mongoose.model('Category', CategorySchema), schema: CategorySchema };
})();