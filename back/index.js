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

app.post("/api/posts", async function(req,res){
    try{
        const newPost=new post({
            sport:req.body.sport,
            tip:req.body.tip,
            sadrzaj:req.body.sadrzaj,
            lozinka:req.body.lozinka,
            
            
            info:{
                mesto:req.body.info.mesto,
                datum:req.body.info.datum,
                vreme:req.body.info.vreme,
            },
            
            kontakt:{
                ime:req.body.kontakt.ime,
                telefon:req.body.kontakt.telefon,
                mail:req.body.kontakt.mail,
            },
        });

        const savedPost=await newPost.save();

        console.log("post req pogodjen");
        console.log(req.body);
        res.send({
            uspesnost:true,
            objava:savedPost,
        });
    }
    catch(err){
        res.send({
            uspesnost:false,
            poruka:err.message
        });
    }
});
app.delete("/api/posts/:id",async function(req,res){
    try{
        const postId = req.params.id;
        const newPost = await post.findById(postId);
        const deletedPost = await newPost.delete();
        res.send({
            uspesnost:true,
            objava:deletedPost,
        });
    }
    catch(err){
        res.send({
            uspesnost:false,
            poruka:err.message
        });
    }
})

app.post("/api/posts/:id/edit", async function(req,res){
    try{
        const postId = req.params.id;
        const newPost = await post.findById(postId);
        const postProp = req.params.prop;

        newPost.sport=req.body.sport;
        newPost.tip=req.body.tip;
        newPost.sadrzaj=req.body.sadrzaj;
        newPost.lozinka=req.body.lozinka;
        
        newPost.info.mesto=req.body.info.mesto;
        newPost.info.datum=req.body.info.datum;
        newPost.info.vreme=req.body.info.vreme;
        
        newPost.kontakt.ime=req.body.kontakt.ime;
        newPost.kontakt.telefon=req.body.kontakt.telefon;
        newPost.kontakt.mail=req.body.kontakt.mail;
        const savedPost=await newPost.save();
        console.log("post edit pogodjen");
        console.log(req.body);
        res.send({
            uspesnost:true,
            objava:savedPost,
        });
    }
    catch(err){
        res.send({
            uspesnost:false,
            poruka:err.message
        });
    }
});