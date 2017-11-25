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

/*
router.put("/update/:userid",function(req,res){
    UserModel.findByIdAndUpdate(req.params.userid,{username:req.body.username,email:req.body.email,fullname:req.body.fullname },function(err,updateuser){
        if(err){
            res.redirect("/");
        }else{
            res.redirect("/");
        }
    })
});   */



router.put("/update/:userid",function(req,res) {

    var objForUpdate = {};
    if (req.body.username) objForUpdate.username = req.body.username;
    if (req.body.email) objForUpdate.email = req.body.email;
    if (req.body.fullname) objForUpdate.fullname = req.body.fullname;
    var setObj = {$set: objForUpdate}


    UserModel.update({_id: req.params.userid}, setObj, function (err, updated) {
        if (err) console.log("Error occured!");
        req.flash("success","Your account is sucessfully updated, welcome back!");
        res.redirect("/")
    });

});

/*
    UserModel.findById(req.params.userid, function (err, user) {
    if (err) return handleError(err);

    user.username = req.body.username;
        user.email = req.body.email;
        user.fullname = req.body.fullname;


        res.redirect("/")



})});  */




module.exports = router;