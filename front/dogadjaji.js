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
            <div class="card-container">
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
                <button class="user-button" id="${counter}" onClick="vidi_jos(this.id)">PRIKAZI VISE</button>
                <button class="delete-button" id="${counter}" onClick = "obrisi(this.id)">🗑️</button>
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
    if(loz===POSTS[Number(id)+1].lozinka)
    {
        let idstring=`http://localhost:3000/api/posts/`+(IDs[Number(id)+1]);
        console.log(IDs[(Number(id))+1]);
        console.log(idstring);
        const res = await axios.delete(idstring);
        console.log(res);
        counter=0;
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
      <p class="vise-p">${currentPost.sadrzaj}</p>
    </div>
 </div>`
    vidijos.innerHTML=tekst;
}