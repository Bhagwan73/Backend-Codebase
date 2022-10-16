const url = "https://www.google.com"

let printSomething = function () {
    console.log("Request details are - a, b, c")
    return "done"
}
//===========================================

let printSome = function () {
    return "Welcome to my application. I am BHAGWAN and a part of FunctionUp lithium  cohort"

}
module.exports.welcome = printSome
module.exports.myUrl = url
module.exports.myFunction = printSomething
