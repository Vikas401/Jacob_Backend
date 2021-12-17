var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    id: { type:String, immutable: true, required: true},
    conversation_id: { type:String,  immutable: true, required: true, default: function genUUID(){
        return uuid.v1() 
       }},   conversationIndex: { type:String, immutable: true, required: true},
   createdDateTime: { type:String, immutable: true, required: true},
   lastModifiedDateTime: { type:String, immutable: true, required: true},
   receivedDateTime: { type:String, immutable: true, required: true},
   sentDateTime: { type:String, immutable: true, required: true},
   internetMessageId: { type:String, immutable: true},
   subject:{ type:String, immutable: true, required: true},
   isRead: { type:Boolean, immutable: true, required: true},
   isDraft: { type:Boolean, immutable: true,required: true},
   sender: { type:Array, immutable: true, required: true},
   from: { type:Array, immutable: true, required: true},
   toRecipients: { type:Array, immutable: true, required: true},
   ccRecipients: { type:Array, immutable: true},
   bccRecipients: { type:Array, immutable: true},
   replyTo:{ type:Array, immutable: true},
   senti_score: [{
    type: Schema.Types.ObjectId,
    ref: "SentiScore",
    immutable: true
   }],
  
}, { timestamps: true })

// defining a Customer model
var Customer = mongoose.model('Customer', CustomerSchema);
module.exports= Customer;