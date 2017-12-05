var express = require("express");
var router = express.Router();
var courseModel = require("../models/courseModel");
var middleware = require("../middleware")



router.get("/",middleware.isLoggedInandAdmin,function(req,res){

    if (req.user.isadmin == "false"){
        req.flash("error","You have not right to access admin page");
        return res.redirect("/");
    }

    if (req.user.isadmin == "true"){
	res.render("admin/admin");
}});


router.get("/courses",middleware.isLoggedInandAdmin,function(req,res){

    courseModel.find({},function(err,courseCollection){
        if(err){
            console.log(err);
        }else{

            res.render("admin/courses",{courses:courseCollection});
        }
    })

});


router.get("/courses/:id",middleware.isLoggedInandAdmin,function(req,res){
    courseModel.findById(req.params.id).exec(function(err,foundcourse){
        if(err){
            console.log(err);
        }else{
            res.render("admin/coursedetail",{course:foundcourse});
        }
    });

});



router.post("/newcourse",middleware.isLoggedInandAdmin,function(req,res){

	var name = req.body.name;
	var img = req.body.img;
	var price = req.body.price;
    var inst = req.body.inst;
    var pre = req.body.pre;
	var des = req.body.des;

    var o1 = req.body.o1;
    var o2 = req.body.o2;
    var o3 = req.body.o3;
    var o4 = req.body.o4;
    var o5 = req.body.o5;

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
        price:price,inst:inst,pre:pre,

	    o1:o1,o2:o2,o3:o3,o4:o4,o5:o5,

		sec1t:sec1t,sec1d:sec1d,sec1v:sec1v,
        sec2t:sec2t,sec2d:sec2d,sec2v:sec2v,
        sec3t:sec3t,sec3d:sec3d,sec3v:sec3v,
        sec4t:sec4t,sec4d:sec4d,sec4v:sec4v
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




router.put("/updatecourse/:id",middleware.isLoggedInandAdmin,function(req,res) {

    var objForUpdate = {};

    if (req.body.name) objForUpdate.name = req.body.name;
    if (req.body.img) objForUpdate.img = req.body.img;
    if (req.body.price) objForUpdate.price = req.body.price;

    if (req.body.inst) objForUpdate.inst = req.body.inst;
    if (req.body.pre) objForUpdate.pre = req.body.pre;
    if (req.body.des) objForUpdate.des = req.body.des;
    if (req.body.o1) objForUpdate.o1 = req.body.o1;
    if (req.body.o2) objForUpdate.o2 = req.body.o2;
    if (req.body.o3) objForUpdate.o3 = req.body.o3;
    if (req.body.o4) objForUpdate.o4 = req.body.o4;
    if (req.body.o5) objForUpdate.o5 = req.body.o5;

    if (req.body.sec1title) objForUpdate.sec1t = req.body.sec1title;
    if (req.body.sec2title) objForUpdate.sec2t = req.body.sec2title;
    if (req.body.sec3title) objForUpdate.sec3t = req.body.sec3title;
    if (req.body.sec4title) objForUpdate.sec4t = req.body.sec4title;

    if (req.body.sec1detail) objForUpdate.sec1d = req.body.sec1detail;
    if (req.body.sec2detail) objForUpdate.sec2d = req.body.sec2detail;
    if (req.body.sec3detail) objForUpdate.sec3d = req.body.sec3detail;
    if (req.body.sec4detail) objForUpdate.sec4d = req.body.sec4detail;

    if (req.body.sec1video) objForUpdate.sec1v = req.body.sec1video;
    if (req.body.sec2video) objForUpdate.sec2v = req.body.sec2video;
    if (req.body.sec3video) objForUpdate.sec3v = req.body.sec3video;
    if (req.body.sec4video) objForUpdate.sec4v = req.body.sec4video;




    var setObj = {$set: objForUpdate}


    courseModel.update({_id: req.params.id}, setObj, function (err, updated) {
        if (err) console.log("Error occured!");
        req.flash("success","The course is sucessfully updated, welcome back!");
        res.redirect("back")
    });

});


router.delete("/:id",middleware.isAuthorizated,function(req,res){
	courseModel.findByIdAndRemove(req.params.id,function(err){
		res.redirect("/courses");
	})
});


module.exports = router;