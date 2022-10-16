const lodash = require("lodash")   //Importing external packages


let trim = function () {
    var strings = "           Function-up"
    triming = strings.trim();  ///  output "functionup"
    LowerCase = triming.toLowerCase();
    UpperCase = LowerCase.toUpperCase();
    return { triming, LowerCase, UpperCase }

}

let lodash2 = function () {
    let arr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let chunk = lodash.chunk(arr, 3)
    //-------------------------------------------------
    let arr2 = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
    let tail = lodash.tail(arr2)      //tail : Gets all but skip the first element of array.
    //-------------------------------------------------
    let arr3 = [2, 3, [2, 3, 4], [4, 5]] //union() method is used to take n number of arrays and creates an array of unique values in order, 
    //from all given arrays using SameValueZero for equality comparisons.
    let union = lodash.union(...arr3)
    //---------------------------------------------------
    let objects = [["horror", "The Shining"], ["drama", "Titanic"], ["thriller", "Shutter Island"], ["fantasy", "Pans Labyrinth"]]
    let fromPairs = lodash.fromPairs(objects)

    //-----------------------------------------------
    return {
        chunk, tail, union, fromPairs
    }
}




module.exports.trimfunction = trim
module.exports.lodashpackage = lodash2