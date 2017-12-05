var mongoose   = require("mongoose");

var courseSchema = new mongoose.Schema({
	name:String,
	img:String,
    price:String,
    inst:String,
    pre:String,
	des:String,

	    o1:String,
        o2:String,
        o3:String,
        o4:String,
        o5:String,

		sec1t:String,
		sec1d:String,
		sec1v:String,

    sec2t:String,
    sec2d:String,
    sec2v:String,

    sec3t:String,
    sec3d:String,
    sec3v:String,

    sec4t:String,
    sec4d:String,
    sec4v:String




});

var courseModel = mongoose.model("courseModel",courseSchema);
module.exports = courseModel;