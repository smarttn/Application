var express = require("express");
var router = express.Router();
var UserModel = require("../models/user");
var middleware = require("../middleware")





router.get("/:id",function(req,res){
	UserModel.findById(req.params.id).exec(function(err,userinfo){
		if(err){
			console.log(err);
		}else{
			res.render("user",{userdata:userinfo});
		}
	});

});


router.put("/:id",function(req,res){
    UserModel.findById(req.params.id).then(function(sanitizedUser){
        if(sanitizedUser){
            if(req.body.newpassword == req.body.newpassword1){
            sanitizedUser.setPassword(req.body.newpassword, function(){
                sanitizedUser.save();
                req.flash("success","password reset successfully, welcome!");
                res.redirect("/");
            });
        }
        else{
                req.flash("success","password not match");
                res.redirect("/");
            }
        } else {
            req.flash("success","password not match");
            res.redirect("/");
        }
    })
});


router.put("/update/:userid",function(req,res){
    UserModel.findByIdAndUpdate(req.params.userid,req.body.userdata,function(err,updateuser){
        if(err){
            res.redirect("/");
        }else{
            res.redirect("/");
        }
    })
});




module.exports = router;