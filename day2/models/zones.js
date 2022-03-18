const mongoose = require("mongoose");
const ZONES = new mongoose.Schema({
    ZonesId:{type:String,default:""},
    CountryId:{type:String,default:""},
    CityId:{type:String,default:""},
    Zone_Number:{type:Number,default:0,unique:true},
    Zone_Title:{type:String,default:""},
    Polygon_Properties:{
        strokeColor:{type:String,default:""},
        strokeOpacity:{type:Number,default:0},
        strokeWeight:{type:Number,default:0},
        fillColor:{type:String,default:""},
        fillOpacity:{type:Number,default:0},
        draggable:{type:Boolean,default:false},
        editable:{type:Boolean,default:false},
        visible:{type:Boolean,default:false},
    },
    Polygon_Paths:{
        _id:false,
        lat:{type:Number,default:0},
        lng:{type:Number,default:0}
    },
    Geometry:{
        type:{type:String,default:"Polygon"},
        coordinates:{type:[[[Number]]],default:[]}
    },
    Address:{type:String,default:""},
    Manual_Address:{type:String,default:""},
    lat:{type:Number,default:0},
    lng:{type:Number,default:0},
    Status:{type:Boolean,default:true},
},{timestamps:true}
// {collection:'ZONES',timestamps:{createdAt:"created_at",updatedAt:"updated_at"}}
)
ZONES.index({coordinates:"2dsphere"});
ZONES.index({Geometry:"2dsphere"});
const zone = mongoose.model('ZONES',ZONES)

module.exports = zone;
