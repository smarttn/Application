var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");
var passport   = require("passport");
var methodOverride = require("method-override");
var LocalStrategy = require("passport-local");
var flash = require('connect-flash');
var User = require("./models/user");

var commentRoutes    = require("./routes/comments"),
    courseRoutes = require("./routes/course"),
    indexRoutes      = require("./routes/index"),
	userRoutes = require("./routes/user")


mongoose.connect("mongodb://rliu1:mlab2678802@ds141175.mlab.com:41175/kiditech");

//mongoose.connect(process.env.DATABASEURL);
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");


app.use(require("express-session")({
	secret:"Secret session",
	resave: false,
	saveUninitialized:false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});


app.use(indexRoutes);
app.use("/courses",courseRoutes);
app.use("/user",userRoutes);

app.use("/courses/:id/comments",commentRoutes);

//app.listen("3000",function(){
	//console.log("Server started");
 //})
app.listen(process.env.PORT, process.env.IP,function(){
	console.log("Server started!");
});