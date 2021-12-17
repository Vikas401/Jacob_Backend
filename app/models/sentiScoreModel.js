var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const SentiScoreSchema = new Schema({
        score: { type:Number, immutable: true},
        categories: [{ type:Number, immutable: true}],
        topic: [{ type:String, immutable: true}],
        entities: [{ type:String, immutable: true}]
     
 }, { timestamps: true })
var SentiScore = mongoose.model('SentiScore', SentiScoreSchema);
module.exports = SentiScore;