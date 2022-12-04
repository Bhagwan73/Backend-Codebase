const mongoose = require("mongoose")

//STRING_VALIDATOR
exports.isValidString = function (name) {
    return (typeof name === "string" && name.trim().length > 0 && name.match(/^[\D]+$/))
}
//MOBILE_VALIDATOR
exports.isvalidMobile = function (mobile) {
    return /^([+]\d{2})?\d{10}$/.test(mobile)
}
//EMAIL_VALIDATOR
exports.isValidEmail = function (email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}
//PASSWORD_VALIDATOR
exports.isValidPass = function (password) {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/.test(password)
}
//OBJECT_ID_VALIDATOR
exports.isValidObjectId = function (value) {
    return mongoose.Types.ObjectId.isValid(value)
}
//ISBN_VALIDATOR
exports.isValidISBN = function (ISBN) {
    return /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?(?:(?:\D*\d){7})?$)/.test(ISBN)
}
//PINCODE_VALIDATOR
exports.isValidPincode = function (pin) {
    return /^[\d]{6}$/.test(pin)
}
//CITY_VALIDATOR
exports.isValidCity = function (city) {
    return /^[A-Za-z]+$/.test(city)
}
//DATE_VALIDATOR
exports.isValidDate = function (Date) {
    return /^((?:19|20)[0-9][0-9])-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/.test(Date)
}
//RATING_VALIDATOR
exports.isValidRating = function (value) {
    return /^[1-5]$/.test(value)
}


