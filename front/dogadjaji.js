GetData();
var IDs=[String];
var counter=0;
var POSTS=[Object];
let Posts=[Object];
function CreateCard(post) {
    IDs.push(post._id);
    console.log(IDs.length);
    console.log(IDs[IDs.length-1]);
    POSTS.push(post);

    let card = `
    <section class="objave">
        <div class="cards">
            <div class="card-container" id="sl${counter}">
              <div class="naslov"> 
                <h2 class="sport">${post.sport}</h2>
              </div>  
                <div class="user-info">
                    <p class="vrsta"><strong>VRSTA DOGAĐAJA:</strong></p>
                    <p class="vrsta2">${post.tip}</p>
                    <div class="naslov"> 
                      <p class="vrsta"><strong>DATUM:</strong></p>
                      <p class="vrsta"><strong>${post.info.datum}</strong></p>
                    </div>
                    <div class="naslov"> 
                      <p class="vrsta"><strong>VREME:</strong></p>
                      <p class="vrsta"><strong>${post.info.vreme}</strong></p>
                    </div>
                    <p class="vrsta"><strong>MESTO:</strong></p>
                    <p class="vrsta3">${post.info.mesto}</p>
                </div>
                <button class="user-button" id="${counter}" onClick="vidi_jos(this.id)">PRIKAŽI VIŠE</button>
                <button class="delete-button" id="${counter}" onClick = "obrisi(this.id)">🗑️</button>
                <button class="edit-button" id="${counter}" onClick = "izmeni(this.id)"><i class="far fa-edit"></i></button>
            </div> 
        </div>
    </section>`;
    counter++;
    return card;
}

function RenderPosts(posts) {
    const cardsDiv = document.querySelector(".cards");
    let cards = "";
    Posts=[Object];
    posts.forEach(function(post){
        Posts.push(post);
    });
    console.log(Posts);
    for(let i=1;i<Posts.length;i++)
    {
        for(let j=1;j<i;j++)
        {
            if(Number(Posts[i].info.datumN) < Number(Posts[j].info.datumN))
            {
                let t=Posts[i];
                Posts[i]=Posts[j];
                Posts[j]=t;
            }
        }
    }

    for(let i=1;i<Posts.length;i++)
    {
        if(Posts[i].sport===document.getElementById("select").value || document.getElementById("select").value==="Sve")
            cards += CreateCard(Posts[i]);
        else if(document.getElementById("select").value==="Drugo" && (Posts[i].sport!=="Fudbal" && Posts[i].sport!=="Košarka" && Posts[i].sport!=="Rukomet" && Posts[i].sport!=="Odbojka" && Posts[i].sport!=="Tenis" && Posts[i].sport!=="Stoni tenis" && Posts[i].sport!=="Gimnastika" && Posts[i].sport!=="Plivanje" && Posts[i].sport!=="Vaterpolo" && Posts[i].sport!=="Šah" && Posts[i].sport!=="Workout"))
            cards += CreateCard(Posts[i]);
    };
    cardsDiv.innerHTML="";
    cardsDiv.innerHTML = cards;
    for(let i=0;i<counter;i++)
    {
        let slika="";
        if(document.getElementById("select").value==="Sve")
        {
            let sport=Posts[i+1].sport;
            if(sport==="Fudbal"){
                slika="../img/404LogoLoptablck.png";
            }
            else if(sport==="Košarka"){
                slika="../img/kosarka.png"
            }
            else if(sport==="Rukomet"){
                slika="../img/rukomet.png";
            }
            else if(sport==="Odbojka"){
                slika="../img/odbojka.png";
            }
            else if(sport==="Tenis"){
                slika="../img/kissclipart-tennis-ball-8375e002a473cc31.png";
            }
            else if(sport==="Stoni tenis"){
                slika="../img/ball-table.png";
            }
            else if(sport==="Gimnastika"){
                slika="../img/images.png";
            }
            else if(sport==="Plivanje"){
                slika="../img/plivanje.png";
            }
            else if(sport==="Vaterpolo"){
                slika="../img/waterpolo.png";
            }
            else if(sport==="Šah"){
                slika="../img/sah.png";
            }
            else if(sport==="Workout"){
                slika="../img/teg.png";
            }
            else{
                slika="../img/patike.png";
            }
        }
        else
        {
            let sport=document.getElementById("select").value;
            if(sport==="Fudbal"){
                slika="../img/404LogoLoptablck.png";
            }
            else if(sport==="Košarka"){
                slika="../img/kosarka.png"
            }
            else if(sport==="Rukomet"){
                slika="../img/rukomet.png";
            }
            else if(sport==="Odbojka"){
                slika="../img/odbojka.png";
            }
            else if(sport==="Tenis"){
                slika="../img/kissclipart-tennis-ball-8375e002a473cc31.png";
            }
            else if(sport==="Stoni tenis"){
                slika="../img/ball-table.png";
            }
            else if(sport==="Gimnastika"){
                slika="../img/images.png";
            }
            else if(sport==="Plivanje"){
                slika="../img/plivanje.png";
            }
            else if(sport==="Vaterpolo"){
                slika="../img/waterpolo.png";
            }
            else if(sport==="Šah"){
                slika="../img/sah.png";
            }
            else if(sport==="Workout"){
                slika="../img/teg.png";
            }
            else{
                slika="../img/patike.png";
            }
        }
        document.getElementById(`sl${i}`).style.backgroundImage=`url(${slika})`;
    }
}

async function GetData() {
    try {
        let posts = await axios.get("http://localhost:3000/api/posts");
        counter=0;
        RenderPosts(posts.data.posts);
    }catch (err) {
        console.log(err);
    }
}

async function obrisi(id)
{
    var loz = prompt("Unesite lozinku za objavu : ");
    if(loz===POSTS[Number(id)+1].lozinka || loz==="JOSHUA")
    {
        let idstring=`http://localhost:3000/api/posts/`+(IDs[Number(id)+1]);
        console.log(IDs[(Number(id))+1]);
        console.log(idstring);
        const res = await axios.delete(idstring);
        console.log(res);
        counter=0;
        POSTS=[Object];
        IDs=[String];
        GetData();
    }
    
}

function vidi_jos(id)
{
    const vidijos = document.querySelector(".dodaj_jos");
    document.getElementById("jos").style.display="flex";
    document.getElementById("cards").style.display="none";
    document.getElementById("select").style.display="none";
    let currentPost=POSTS[(Number(id)+1)];
    var tekst=
    `<div class="vise">
        <br><br>
        <h1 class="vise-h1">${currentPost.sport}</h1><br><br>
        <div class="vise-text">
          <p class="vise-p">Vrsta događaja: ${currentPost.tip}</p>
          <p class="vise-p">Datum: ${currentPost.info.datum}</p>
          <p class="vise-p">Vreme: ${currentPost.info.vreme}</p>
          <p class="vise-p">Mesto: ${currentPost.info.mesto}</p>
          <p class="vise-p-sadrzaj">Dodatne informacije: ${currentPost.sadrzaj}</p><br><br>
          <h2 class="vise-h2">Kontant:</h2><br>
          <p class="vise-p">Ime i prezime: ${currentPost.kontakt.ime}</p>
          <p class="vise-p">Broj telefona: ${currentPost.kontakt.telefon}</p>
          <p class="vise-p">E-Mail adresa: ${currentPost.kontakt.mail}</p>
        </div>
        
        <button class="nazad" onClick="vidi_manje()">NAZAD</button> 
        
    </div>`
    vidijos.innerHTML=tekst;
}

function vidi_manje(id)
{
    document.getElementById("jos").style.display="none";
    document.getElementById("cards").style.display="flex";
    document.getElementById("select").style.display="flex";
}
