var mongoose   = require("mongoose");

var enrollSchema = mongoose.Schema({
    coursename:String,

    student:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }},


    created:  {type: Date, default: Date.now},
    email:String,
    token:String

});




module.exports = mongoose.model("Enroll", enrollSchema);
