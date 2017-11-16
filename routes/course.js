var express = require("express");
var router = express.Router();
var courseModel = require("../models/courseModel");
var middleware = require("../middleware")

router.post("/",middleware.isLoggedIn,function(req,res){
	if (req.user.isadmin == "false"){
        req.flash("error","You have not right to upload a course");
        return res.redirect("/courses");
	}

	if (req.user.isadmin == "true"){
	var name = req.body.name;
	var src = req.body.src;
	var des = req.body.des;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newcourse = {name:name,src:src,des:des,author:author};
	
	courseModel.create(newcourse,function(err,newlyCreated){
		if(err){
			console.log(err);
		}else{
			res.redirect("/courses");
		}
	})
}});

router.get("/upload",middleware.isLoggedIn,function(req,res){
	res.render("courses/upload");
});

router.get("/",function(req,res){
	courseModel.find({},function(err,courseCollection){
		if(err){
			console.log(err);
		}else{
			res.render("courses/coursepage",{courses:courseCollection});
		}
	})
});
router.get("/:id",function(req,res){
	courseModel.findById(req.params.id).populate("comments").exec(function(err,foundcourse){
		if(err){
			console.log(err);
		}else{
			res.render("courses/show",{course:foundcourse});
		}
	});

});

router.get("/:id/enroll",middleware.isLoggedIn,function(req,res){
    courseModel.findById(req.params.id,function(err,enrollcourse){
        if(err){
            console.log(err);
        }else{
            res.render("courses/enroll",{course:enrollcourse});
        }
    });

});



router.get("/:id/edit",middleware.isAuthorizated,function(req,res){
	courseModel.findById(req.params.id,function(err,foundcourse){
		res.render("courses/edit",{course:foundcourse});
	});
});

router.put("/:id",middleware.isAuthorizated,function(req,res){
	courseModel.findByIdAndUpdate(req.params.id,req.body.course,function(err,updatedcourse){
		if(err){
			res.redirect("/courses");
		}else{
			res.redirect("/courses/" + req.params.id);
		}
	})
});

router.delete("/:id",middleware.isAuthorizated,function(req,res){
	courseModel.findByIdAndRemove(req.params.id,function(err){
		res.redirect("/courses");
	})
});


module.exports = router;