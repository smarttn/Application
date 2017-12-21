var mongoose   = require("mongoose");

var shopSchema = new mongoose.Schema({

	name:String,
	img:String,
    price:String,
    avail:String,
	des:String,
    detail:String

});

var shopModel = mongoose.model("shopModel",shopSchema);
module.exports = shopModel;