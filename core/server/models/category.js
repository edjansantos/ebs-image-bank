module.exports = ((mongoose) => {
    const CategorySchema = new mongoose.Schema({
        name: {
          type: String,
          required: true
        }
      });
    
      return CategorySchema;
});