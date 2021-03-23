const express = require("express");
const app = express();
const connect_baza = require("./baza/baza");
const post = require("./baza/post");

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server slusa na portu: ${PORT}`);
});

//konekcija sa bazom
connect_baza();

// Sa JSON
app.use(express.json());

app.get("/api/posts", async function(req,res){
    try{
        const all_posts = await post.find();
        res.json({
            uspesno:true,
            posts:all_posts
        });
    }
    catch(err){
        res.send({
            uspesnost:false,
            poruka:err.message
        });
    }
});