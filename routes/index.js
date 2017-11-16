var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user")
var courseModel = require("../models/courseModel");

//－－－－1级路由规则－－－－－//


router.get("/",function(req,res){
	res.render("index");

});

//router.get("/course",function(req,res){
    //courseModel.find({},function(err,coursecollection){
       // if(err){
 //           console.log(err);
 //       }else{
 //           res.render("course/course",{courses:coursecollection});
 //       }
 //   })
//});

router.get("/courses",function(req,res){
    res.render("courses/courses");

});


router.get("/event",function(req,res){
    res.render("event/events");

});



router.get("/program",function(req,res){
    res.render("program/program");

});

router.get("/about",function(req,res){
    res.render("about");

});

router.get("/contact",function(req,res){
    res.render("contact");

});


router.get("/event",function(req,res){
    res.render("event/event");

});




router.get("/shop",function(req,res){
    res.render("shop/shop");

});

router.get("/feature",function(req,res){
    res.render("feature/feature");

});

router.get("/donate",function(req,res){
    res.render("donate/donate");

});

router.get("/mycourses/:id",function(req,res){
    res.render("mycourses/mycourses");

});



//-------------footer route---------------------------------//

router.get("/gallery",function(req,res){
    res.render("gallery");

});
router.get("/blog",function(req,res){
    res.render("blog/blogs");

});
router.get("/career",function(req,res){
    res.render("career");

});
router.get("/faq",function(req,res){
    res.render("faq");

});
router.get("/privacy-policy",function(req,res){
    res.render("privacy-policy");

});
router.get("/help",function(req,res){
    res.render("help");

});





//----------------------------------------------//



router.post("/register",function(req,res){
	var newUser = new User({username:req.body.username,email:req.body.email,fullname:req.body.fullname,isadmin:"false"});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message);
			return res.redirect("/");
		}
		passport.authenticate("local")(req,res,function(){
		req.flash("success","Account created successfully, welcome here!");
		res.redirect("/");
		})
	})
});



router.get("/login",function(req,res){
	res.render("login");
});

router.post("/login",passport.authenticate("local",
	{
		successRedirect:"/",
		failureRedirect:"/login",
		failureFlash: 'Invalid username or password.'
	}),function(req,res){
});

router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Logged you out!");
	res.redirect("/");
});



module.exports = router;