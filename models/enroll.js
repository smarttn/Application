var mongoose   = require("mongoose");

var enrollSchema = mongoose.Schema({
    coursename:String,

    student:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }},


    created:  {type: Date, default: Date.now}
});

module.exports = mongoose.model("Enroll", enrollSchema);
