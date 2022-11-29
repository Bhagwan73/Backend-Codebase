const mongoose = require("mongoose")

//------------------>>>-name_Validation-<<<-------------------<<
exports.isValidString = function (name) {
    return (typeof name === "string" && name.trim().length > 0 && name.match(/^[\D]+$/))
}

//------------------>>>-phone_Validation-<<<-------------------<<
exports.isvalidMobile = function (mobile) {
    return /^([+]\d{2})?\d{10}$/.test(mobile)
}

//------------------>>>-email_Validation-<<<--------------------<<
exports.isValidEmail = function (email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

//------------------>>>-pass_Validation-<<<---------------------<<
exports.isValidPass = function (password) {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/.test(password)
}

//------------------>>>-obj_Id_Validation-<<<--------------------<<
exports.isValidObjectId = function (value) {
    return mongoose.Types.ObjectId.isValid(value)
}

//------------------>>>-ISBN_Validation-<<<-----------------------<<
exports.isValidISBN = function (ISBN) {
    return /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?(?:(?:\D*\d){7})?$)/.test(ISBN)
}

//------------------>>>-pincode_Validation-<<<---------------------<<
exports.isValidPincode = function (pin) {
    return /^[\d]{6}$/.test(pin)
}

//------------------>>>-city_Validation-<<<-------------------------<<
exports.isValidCity = function (city) {
    return /^[A-Za-z]+$/.test(city)
}

//------------------>>>-city_Validation-<<<-------------------------<<
exports.isValidDate = function (Date) {
    return/^((?:19|20)[0-9][0-9])-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/.test(Date)
}

