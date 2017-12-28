/**
 * Created by ZHANG JOHN on 2017/12/26.
 */
var mongoose   = require("mongoose");

var problemSchema = mongoose.Schema({
    id: Number,
    title: String,
    category: String,
    difficulty: String,
    description: String,
    example: String,
    hint: String,
    code_framework: String,
    function_call: String,
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
    }
});

var problem = mongoose.model("problem",problemSchema);
module.exports = problem;