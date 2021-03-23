const mongoose = require("mongoose");

async function connect_baza(){
    try{
        const link="mongodb+srv://404tim:ravanica035@cluster0.grmff.mongodb.net/Postovi?retryWrites=true&w=majority";
        //konekt
        const connection = await mongoose.connect(link, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });

        console.log("Baza uspesna");
    }
    catch(err){
        console.log(`Error: ${err.message}`);
    }
}

module.exports = connect_baza;