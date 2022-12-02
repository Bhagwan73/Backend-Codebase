const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema ({
    name:{
        type:String
    },
    hobbies:{
        type:[String]
    },
    experience:
        [{name:{type:String},
        year:{type:String}}
    ]
})