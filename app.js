var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");
var passport   = require("passport");
var methodOverride = require("method-override");
var LocalStrategy = require("passport-local");
var flash = require('connect-flash');
var User = require("./models/user");

var indexRoutes      = require("./routes/index"),
	adminRoutes = require("./routes/admin")
	userRoutes = require("./routes/user")


mongoose.connect("mongodb://kiditechdb:kiditech520@ds163796.mlab.com:63796/kiditech");




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

app.use("/user",userRoutes);
app.use("/admin",adminRoutes);


//app.listen("3000",function(){
//console.log("Server started");
//})

app.listen(process.env.PORT, process.env.IP,function(){
console.log("Server started!");
});