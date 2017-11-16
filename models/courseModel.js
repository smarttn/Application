var mongoose   = require("mongoose");

var courseSchema = new mongoose.Schema({
	name:String,
	src:String,
	des:String,
	author:{
		id:{         
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username:String
	},
	comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

var courseModel = mongoose.model("courseModel",courseSchema);
module.exports = courseModel;