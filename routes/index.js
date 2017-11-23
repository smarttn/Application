var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user")
var courseModel = require("../models/courseModel");
var middleware = require("../middleware")
var Enroll = require("../models/enroll")


//－－－－1级路由规则－－－－－//


router.get("/",function(req,res){
	res.render("index");

});



router.get("/about",function(req,res){
    res.render("about");

});

router.get("/contact",function(req,res){
    res.render("contact");

});


//-------------Courses detail route---------------------------------//


router.get("/courses",function(req,res){
    res.render("courses/courses");

});


router.get("/course/game-design-with-stratch",function(req,res){
    res.render("courses/details/game-design-with-stratch");

});
router.get("/course/python-coding-with-game",function(req,res){
    res.render("courses/details/python-coding-with-game");

});
router.get("/course/iot-with-raspberrypi",function(req,res){
    res.render("courses/details/iot-with-raspberrypi");

});
router.get("/course/electrical-engineering-with-arduino",function(req,res){
    res.render("courses/details/electrical-engineering-with-arduino");

});
router.get("/course/robot-vex",function(req,res){
    res.render("courses/details/robot-vex");

});
router.get("/course/wonder-dash-and-dot",function(req,res){
    res.render("courses/details/wonder-dash-and-dot");

});
router.get("/course/game-design-with-unity",function(req,res){
    res.render("courses/details/game-design-with-unity");

});
router.get("/course/3d-design-and-printing",function(req,res){
    res.render("courses/details/3d-design-and-printing");

});

router.get("/course/:id/enroll",middleware.isLoggedIn,function(req,res){

res.render("courses/enroll",{course:req.params.id,price:400});


});


/*
router.post("/enroll/:id",function(req,res){

    Enroll.create(req.body.coursename,function(err, enroll){
        if(err){
            console.log(err);
        }else{
            enroll.student.id = req.params.id;

            enroll.save();

            req.flash("success","Leave a comment successfully")
            res.redirect("/");
        }
    })


        });    */



router.post("/enroll/:id",function(req,res){

    var newenroll = {coursename:req.params.id,student:{id:req.user._id}};
    //var newenroll = {coursename:req.body.coursename,student:{id:req.body.userid}};

    Enroll.create(newenroll, function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            req.flash("success","You had completed the enrollment, welcome back!");
            res.redirect("/");

        }
    })
});




//-------------event route---------------------------------//

router.get("/event",function(req,res){
    res.render("event/events");

});


router.get("/event/bay-area-parent-education-fair",function(req,res){
    res.render("event/eventdetail/bay-area-parent-education-fair");

});

router.get("/event/kiditech-openhouse-2017",function(req,res){
    res.render("event/eventdetail/kiditech-openhouse-2017");

});




//-------------shop route---------------------------------//

router.get("/shop",function(req,res){
    res.render("shop/shop");


});

router.get("/shop/3d-printing-service",function(req,res){
    res.render("shop/item/3d-printing-service");


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





//--------------login logout register route--------------------------------//

router.post("/register",function(req,res){
	var newUser = new User({username:req.body.username,email:req.body.email,fullname:req.body.fullname,isadmin:"false"});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message);
			return res.redirect("back");
		}
		passport.authenticate("local")(req,res,function(){
		req.flash("success","Account created successfully, welcome here!");
		res.redirect("back");
		})
	})
});



router.get("/login",function(req,res){
	res.render("login");
});

router.post("/login",passport.authenticate("local",
	{
		successRedirect:"/",
		failureRedirect:"back",
		failureFlash: 'Invalid username or password.'
	}),function(req,res){
});

router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Logged you out!");
	res.redirect("/");
});


//----------------------------------------------//

module.exports = router;