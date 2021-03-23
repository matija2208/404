const mongoose=require("mongoose");

const KontaktSchema=new mongoose.Schema({
    ime:{
        type:String,
        trim:true,
        required:true,
    },
    telefon:{
        type:String,
        trim:true,
        required:true,
    },
    mail:{
        type:String,
        trim:true,
        required:true,
    },
});

const InfoSchema=new mongoose.SchemaType({
    mesto:{
        type:String,
        trim:true,
        required:true,
    },
    datum:{
        type:String,
        trim:true,
        required:true,
    },
    vreme:{
        type:String,
        trim:true,
        required:true,
    },
});
const PostSchema=new mongoose.Schema({
    sport:{
        type:String,
        trim:true,
        required:true,
    },
    tip:{
        type:String,
        trim:true,
        required:true,
    },
    sadrzaj:{
        type:String,
        trim:true,
        required:true,
    },
    lozinka:{
        type:String,
        trim:true,
        required:true,
    },
    kontakt:KontaktSchema,
    info:InfoSchema,
});

module.exports=mongoose.model("post", PostSchema);