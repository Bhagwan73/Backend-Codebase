const axios = require("axios")

const getByDistricts = async function (req, res) {
    try {
        const { district_id, date } = req.query
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district_id}&date=${date}`
        }
        let result = await axios(options)
        let data = result.data
        res.status(200).send({ status: true, msg: data })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

const checkweather = async function (req, res) {
    try {
        let arr = []
        let cities = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        for (let index = 0; index < cities.length; index++) {
            const element = cities[index];
            const { appid } = req.query
            let options = {
                method: "get",
                url: `http://api.openweathermap.org/data/2.5/weather?appid=${appid}&q=${element}`
            }
            let result = await axios(options)
            let data = result.data
            const { main: { temp }, name } = data
            arr.push({ name, temp })
        }
        arr.sort((a, b) => {
            return a.temp - b.temp;
        })
        res.status(200).send({ status: true, msg: arr })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

const createMemes = async function (req, res) {
    try {
        const { template_id, text0, text1, username, password } = req.query

        let options = {
            method: "post",
            url: `https://api.imgflip.com/caption_image?template_id=${template_id}&text0=${text0}&text1=${text1}&username=${username}&password=${password}`
        }
        let result = await axios(options)
        let data =result.data
        res.status(200).send({ status: true, msg:data})
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = { getByDistricts, checkweather, createMemes }