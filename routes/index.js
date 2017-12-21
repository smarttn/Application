var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user")
var courseModel = require("../models/courseModel");
var middleware = require("../middleware")
var Enroll = require("../models/enroll")


var stripe = require("stripe")("sk_test_EqOT1pK0QJWpexqQ65cjWGFH");



//－－－－1级路由规则－－－－－//


router.get("/",function(req,res){

    courseModel.find({},function(err,courseCollection){
        if(err){
            console.log(err);
        }else{

            res.render("index",{courses:courseCollection});
        }
    })

});



router.get("/about",function(req,res){
    res.render("about");

});

router.get("/contact",function(req,res){
    res.render("contact");

});


//-------------Courses detail route---------------------------------//


router.get("/courses",function(req,res){
    courseModel.find({},function(err,courseCollection){
        if(err){
            console.log(err);
        }else{

            res.render("courses/courses",{courses:courseCollection});
        }
    })

});


router.get("/course/:id",function(req,res){
    courseModel.findById(req.params.id).exec(function(err,foundcourse){
        if(err){
            console.log(err);
        }else{
            res.render("courses/coursedetail",{course:foundcourse});
        }
    });

});




router.get("/course/:id/enroll",middleware.isLoggedIn,function(req,res){


    courseModel.findById(req.params.id).exec(function(err,found){
        if(err){
            console.log(err);
        }else{
            res.render("courses/enroll",{course:found});
        }
    });




});




router.post("/enroll/:id",function(req,res){


    Enroll.findOne({
        'coursename': req.params.id,
        'student.id':req.user._id }, function(err, user) {
        // hanlde err..
        if (user) {

            req.flash("success","Duplicate enrollment");
            res.redirect("/");

        } else {
            var newenroll = {coursename:req.params.id,student:{id:req.user._id}};

            stripe.customers.create({
                email: req.body.stripeEmail,
                source: req.body.stripeToken
            })
                .then(customer =>
            stripe.charges.create({
                amount:req.body.price*100,
                description: "Sample Charge",
                currency: "usd",
                customer: customer.id
            }))
        .then(charge =>  Enroll.create(newenroll, function(err,newlyCreated){
                if(err){
                    console.log(err);
                }else{
                    req.flash("success","You had completed the enrollment, welcome back!");
                    res.redirect("/");
                }
            }));





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