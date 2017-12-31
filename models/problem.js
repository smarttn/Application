
var mongoose   = require("mongoose");

var problemSchema = mongoose.Schema({
    number:String,
    title: String,
    category: String,
    difficulty: String,
    description: String,
    //example: String,
    //hint: String,


    code1: String,
    code2: String,


    /*
    test_cases:{
        test_case1:{
            input:[],
            output:[]
        },
        test_case1:{
            input:[],
            output:[]
        },
        test_case3:{
            input:[],
            output:[]
        }
    },  */


});

var problem = mongoose.model("problem",problemSchema);
module.exports = problem;