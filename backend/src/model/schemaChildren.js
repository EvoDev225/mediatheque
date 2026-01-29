
const mongoose = require('mongoose')
const schemaChildren = new mongoose.Schema({
    nom:{type:String,required:true},
    prenom:{type:String,required:true},
    date:{type:String,required:true,
        match: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
    },
    sexe:{type:String,required:true,
        enum:["garçon","fille"]
    },
    numeroParent:{type:String,required:true,max:10},
    classe:{type:String,required:true}
},{
    timestamps:true
})
const Child = mongoose.model("child",schemaChildren)
module.exports=Child