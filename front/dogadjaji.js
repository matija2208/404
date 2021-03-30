GetData();
var IDs=[String];
var counter=0;
var POSTS=[Object];
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
                <button class="edit-button" id="${counter}" onClick = "obrisi(this.id)"><i class="far fa-edit"></i></button>
            </div> 
        </div>
    </section>`;
    counter++;
    return card;
}

function RenderPosts(posts) {
    const cardsDiv = document.querySelector(".cards");
    let cards = "";
    posts.forEach(function(post){
        cards += CreateCard(post);
    });

    cardsDiv.innerHTML = cards;
    cardsDiv.innerHTML = cards;
    for(let i=0;i<counter;i++)
    {
        let sport=posts[i].sport;
        let slika="";
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
        document.getElementById(`sl${i}`).style.backgroundImage=`url(${slika})`;
    }
}

async function GetData() {
    try {
        let posts = await axios.get("http://localhost:3000/api/posts");
        console.log(posts);
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
        POSTS=[String];
        IDs=[String];
        GetData();
    }
    
}

function vidi_jos(id)
{
    const vidijos = document.querySelector(".dodaj_jos");
    document.getElementById("jos").style.display="flex";
    document.getElementById("cards").style.display="none";
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
        <br><br><br>
        <button class="nazad" onClick="vidi_manje()">NAZAD</button> 
        
    </div>
    <br><br><br>`
    vidijos.innerHTML=tekst;
}

function vidi_manje(id)
{
    document.getElementById("jos").style.display="none";
    document.getElementById("cards").style.display="flex";
}