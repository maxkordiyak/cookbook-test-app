const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const mongooseTrack = require('mongoose-track');

mongooseTrack.options = {
    track: {
        created_at: false,
        updatedAt: false
    }
};

const RecipeSchema = new Schema({
    name: String,
    description: String,
},{ timestamps: { createdAt: 'created_at' } });

RecipeSchema.plugin(mongoosePaginate);
RecipeSchema.plugin(mongooseTrack.plugin);

module.exports = mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);
