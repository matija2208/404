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
    document.getElementById("izmeni").style.display="none";
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
    document.getElementById("izmeni").style.display="none";
}

function provera(input, sport)
{
    if(input===sport)
    {
        return "selected";
    }
    else
    {
        return "";
    }
}

function provera2(input, sport)
{
    if(input===sport)
    {
        return "checked";
    }
    else
    {
        return "";
    }
}

function provera3(sport)
{
    if(sport!=="Fudbal" && sport!=="Košarka" && sport!=="Rukomet" && sport!=="Odbojka" && sport!=="Tenis" && sport!=="Stoni tenis" && sport!=="Gimnastika" && sport!=="Plivanje" && sport!=="Vaterpolo" && sport!=="Šah" && sport!=="Workout")
    {
        return "selected";
    }
    else
    {
        return "";
    }
}

function izmeni(id)
{
    var loz = prompt("Unesite lozinku za objavu : ");
    if(loz===POSTS[Number(id)+1].lozinka || loz==="JOSHUA")
    {
        document.getElementById("jos").style.display="none";
        document.getElementById("cards").style.display="none";
        document.getElementById("select").style.display="none";
        document.getElementById("izmeni").style.display="flex";
        let currentPost=POSTS[(Number(id)+1)];
        var sp=currentPost.sport;
        let izmn=` 
            <section style="width:100%;">
                
                <div class="forma" id="formaDiv">
                    <form id="forma">
                    <h1 class="form-title">IZMENI DOGAĐAJ</h1><br><br>

                    <h2 class="form-1">SPORT :</h2>
                    <select class="vreme" id="sport_select" onchange="other_select()">
                        <option ${provera("Fudbal", sp)}>Fudbal</option>
                        <option ${provera("Košarka", sp)}>Košarka</option>
                        <option ${provera("Rukomet", sp)}>Rukomet</option>
                        <option ${provera("Odbojka", sp)}>Odbojka</option>
                        <option ${provera("Tenis", sp)}>Tenis</option>
                        <option ${provera("Stoni tenis", sp)}>Stoni tenis</option>
                        <option ${provera("Gimnastika", sp)}>Gimnastika</option>
                        <option ${provera("Plivanje", sp)}>Plivanje</option>
                        <option ${provera("Vaterpolo", sp)}>Vaterpolo</option>
                        <option ${provera("Šah", sp)}>Šah</option>
                        <option ${provera("Workout", sp)}>Workout</option>
                        <option ${provera3(sp)}>Drugo</option>
                    </select>
                    <!-- INPUT SPORTA -->
                    <input class="add-input" id="sport_input" type="hidden" value="${sp}" />
                    <p class="valid-error hidden" id="sport_error">Ime sporta moze sadrzati samo slova.</p>


                    <!--INPUT ZA BIRANJE TIPOVA RADIO-->
                    <h2 class="form-1">VRSTA DOGAĐAJA:</h2>
                    
                    <div class="tip-div"> 
                    <p class="tip1">UTAKMICA</p>
                    <input type="radio" name="gender" class="tip" value="utakmica" ${provera2("utakmica", currentPost.tip)}><br><br>
                    </div>

                    <br>
                    <div class="tip-div">
                    <p class="tip1">TURNIR</p>
                    <input type="radio" name="gender" class="tip" value="turnir" ${provera2("turnir", currentPost.tip)}><br><br>
                    </div>

                    <br>
                    <div class="tip-div">
                    <p class="tip1">PRIJATELJSKI MEČ</p>
                    <input type="radio" name="gender" class="tip" value="prijateljski meč" ${provera2("prijateljski meč", currentPost.tip)}><br><br>
                    </div>

                    <h2 class="form-1">PODACI:</h2>

                    <!--INPUT ZA DATUM-->
                    <h3 class="form-categ">Datum:</h3>
                    <input type="date" class="vreme" id="datum_input" value="${currentPost.info.datum}"/>

                    <!--INPUT ZA VREME-->
                    <h3 class="form-categ">Vreme:</h3>
                    <input type="time" class="vreme" id="vreme_input" value="${currentPost.info.vreme}"/>

                    <!--INPUT ZA LOKACIJU-->
                    <h3 class="form-categ">Mesto:</h3>
                    <input class="add-input" id="lokacija_input" type="text" value="${currentPost.info.mesto}" />

                    <!--INPUT ZA SADRZAJ-->
                    <h3 class="form-categ">Dodatne informacije:</h3>
                    <div class="sadrzaj" id="sadrzaj_input" contenteditable>${currentPost.sadrzaj}</div>
                    
                    <h2 class="form-1">KONTAKT:</h2>

                    <h3 class="form-categ">Ime i prezime:</h3>

                    <!--INPUT ZA IME-->
                    <input class="add-input" id="ime_input" type="text" value="${currentPost.kontakt.ime}"/>
                    <p class="valid-error hidden" id="ime_error">Ime sme sadrzati samo slova.</p>

                    <!--INPUT ZA TELEFON-->
                    <h3 class="form-categ">Broj telefona:</h3>
                    <input class="add-input" id="tel_input" type="tel" value="${currentPost.kontakt.telefon}"/>
                    <p class="valid-error hidden" id="tel_error">Broj telefona mora biti spojeni niz koji sadrzi samo brojeve (npr. 0631234567).</p>

                    <!--INPUT ZA MAIL-->
                    <h3 class="form-categ">E-Mail adresa:</h3>
                    <input class="add-input" id="mail_input" type="email" value="${currentPost.kontakt.mail}"/>
                    <p class="valid-error hidden" id="mail_error">E-Mail adresa mora sadrzati validnu adresu (example@[mail].com)</p>

                    <!--INPUT ZA LOZINKU-->
                    <h3 class="form-categ">Lozinka:</h3>
                    <input class="add-input" id="pass_input" type="text" value="${currentPost.lozinka}"/>
                    <p class="valid-error hidden" id="pass_error">Lozinka mora sadrzati vise od 6 slova i mora sadrzati barem jedan broj i jedno slovo.</p>

                    
                    <input type="button" class="add-button" id="dodajobjavu" value="IZMENI OBJAVU" onclick="izmena(${id})" ></input>
                    </form>
                </div>
            </section>
        `;
        document.getElementById("izmeni").innerHTML=izmn;
        if (document.getElementById("sport_select").value === "Drugo"){
          document.getElementById("sport_input").type = "text";
        } else
        document.getElementById("sport_input").type = "hidden";
    }
}

async function izmena(id)
{
    //KONTAKT
    var ime = document.getElementById("forma").ime_input.value;
    var telefon = document.getElementById("forma").tel_input.value;
    var mail = document.getElementById("forma").mail_input.value;

    //INFORMACIJE
    var mesto = document.getElementById("forma").lokacija_input.value;
    var datum = document.getElementById("forma").datum_input.value;
    var vreme = document.getElementById("forma").vreme_input.value;

    //SPORT
    var izbor = document.getElementById("sport_select").value;
    if (izbor == 'Drugo'){
      var sport = document.getElementById("forma").sport_input.value;
    } else {
      var sport = izbor;
    }

    var tip = document.querySelector('input[name="gender"]:checked').value;
    var sadrzaj = document.getElementById("sadrzaj_input").textContent;
    var lozinka = document.getElementById("forma").pass_input.value;

    var newPost={
        sport:sport,
        tip:tip,
        sadrzaj:sadrzaj,
        lozinka:lozinka,
        info:{
            mesto:mesto,
            datum:datum,
            vreme:vreme,
        },
        kontakt:{
            ime:ime,
            telefon:telefon,
            mail:mail,
        },
    };
    try{
        var x = await axios.post(`http://localhost:3000/api/posts/${POSTS[Number(id)+1]._id}/edit/`,newPost);
        console.log(POSTS[Number(id)+1]._id);
    }
    catch(err){
        console.log(err);
    }
    window.location.href = "dogadjaji.html";
}
