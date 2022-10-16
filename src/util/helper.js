


let someone = function () {

    const currentDate = new Date();
    const day = currentDate.getDate() //    
    const month = currentDate.getMonth() + 1     // 10 (Month is 0-based, so 10 means 11th Month)
    const year = currentDate.getFullYear()
    return ("Today current date is --->" + " " + [day, month, year])

}
const getBatchInfo = function () {
    return `Batch Name -> lithium, W3D3, 
            The topic for today is : Nodejs module system`
}

module.exports.helper = someone
module.exports.Batch = getBatchInfo