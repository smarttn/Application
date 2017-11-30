var mongoose   = require("mongoose");

var courseSchema = new mongoose.Schema({
	name:String,
	img:String,
	des:String,

	sec1:{
		title:String,
		detail:String,
		video:String
	},
    sec2:{
        title:String,
        detail:String,
        video:String
    },
    sec3:{
        title:String,
        detail:String,
        video:String
    },
    sec4:{
        title:String,
        detail:String,
        video:String
    }


});

var courseModel = mongoose.model("courseModel",courseSchema);
module.exports = courseModel;