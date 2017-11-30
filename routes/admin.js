var express = require("express");
var router = express.Router();
var courseModel = require("../models/courseModel");
var middleware = require("../middleware")



router.get("/",function(req,res){

    if (req.user.isadmin == "false"){
        req.flash("error","You have not right to access admin page");
        return res.redirect("/");
    }

    if (req.user.isadmin == "true"){
	res.render("admin/admin");
}});


router.get("/courses",function(req,res){

    courseModel.find({},function(err,courseCollection){
        if(err){
            console.log(err);
        }else{

            res.render("admin/courses",{courses:courseCollection});
        }
    })

});


router.get("/courses/:id",function(req,res){
    courseModel.findById(req.params.id).exec(function(err,foundcourse){
        if(err){
            console.log(err);
        }else{
            res.render("admin/course_detail",{course:foundcourse});
        }
    });

});







router.post("/newcourse",function(req,res){

	var name = req.body.name;
	var img = req.body.img;
	var des = req.body.des;
    var sec1t = req.body.sec1title;
    var sec1d = req.body.sec1detail;
    var sec1v = req.body.sec1video;
    var sec2t = req.body.sec2title;
    var sec2d = req.body.sec2detail;
    var sec2v = req.body.sec2video;
    var sec3t = req.body.sec3title;
    var sec3d = req.body.sec3detail;
    var sec3v = req.body.sec3video;
    var sec4t = req.body.sec4title;
    var sec4d = req.body.sec4detail;
    var sec4v = req.body.sec4video;



	var newcourse = {name:name,img:img,des:des,
		sec1:{title:sec1t,detail:sec1d,video:sec1v},
        sec2:{title:sec2t,detail:sec2d,video:sec2v},
        sec3:{title:sec3t,detail:sec3d,video:sec3v},
        sec4:{title:sec4t,detail:sec4d,video:sec4v},
	};
	
	courseModel.create(newcourse,function(err,newlyCreated){
		if(err){
			console.log(err);
		}else{
            req.flash("success","Success, Welcome Back!");
			res.redirect("back");
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