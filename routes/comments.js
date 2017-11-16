var express = require("express");
var router = express.Router({mergeParams:true});
var courseModel = require("../models/courseModel");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/new",middleware.isLoggedIn,function(req,res){
	courseModel.findById(req.params.id,function(err,course){
		if(err){
			console.log(err);
		}else{
			res.render("comments/newcomment",{course:course});
		}
	})
});
//create router
router.post("/",middleware.isLoggedIn,function(req,res){
	courseModel.findById(req.params.id,function(err, course){
		if(err){
			console.log(err);
		}else{
			Comment.create(req.body.comment,function(err, comment){
				if(err){
					console.log(err);
				}else{
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					course.comments.push(comment);
					course.save();
					req.flash("success","Leave a comment successfully")
					res.redirect("/courses/"+course.id);
				}
			})
		}
	});
});

router.get("/:comment_id/edit",middleware.isCommentAuthorizated,function(req,res){
	Comment.findById(req.params.comment_id,function(err,comment){
		if(err){
			res.redirect("back");
		}else{
			res.render("comments/edit",{ course_id:req.params.id,
										 comment:comment

			});
		}
	});
	
})

router.put("/:comment_id",middleware.isCommentAuthorizated,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if(err){
			console.log(err);
		}else{
			res.redirect("/courses/"+req.params.id);
		}
	})
});

//destroy comment route
router.delete("/:comment_id",middleware.isCommentAuthorizated,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			res.redirect("back");
		}else{
			req.flash("success","Comment deleted successfully");
			res.redirect("/courses/"+req.params.id);
		}
	})
})



module.exports = router;