var valid_test;
var axios=
      //PROVERA OTHER
      function other_select(){
        var izbor = document.getElementById("sport_select").value;
        if (izbor == 'Drugo'){
          document.getElementById("sport_input").type = "text";
        } else
        document.getElementById("sport_input").type = "hidden";
      }

      //VALIDACIJA SHORTCUT
      function validiraj(){
        valid_test=true;

        if (document.getElementById("sport_select").value == 'Drugo'){
          validiraj_sport();
        }
        else
        {
            document.getElementById("sport_error").classList.add("hidden");
        }
        validiraj_ime();
        validiraj_tel();
        validiraj_mail();
        validiraj_pass();

        if(valid_test == true){
          objavi_post();
        } else{
          console.log("Post se ne objavljuje");
        }
      }

    //REGEX VALIDACIJA ZA SPORT
      function validiraj_sport(){

        var pattern = /^[A-Za-z ]{1,30}$/;
        var tekst = document.getElementById("forma").sport_input.value;
        var test = tekst.match(pattern);

        if (test == null) {
          document.getElementById("sport_error").classList.remove("hidden");
          valid_test = false;
      } else{
        console.log("validiran sport");
        document.getElementById("sport_error").classList.add("hidden");
      }
    }

    //REGEX VALIDACIJA ZA IME
      function validiraj_ime(){

        var pattern = /^[A-Za-z ]{1,75}$/;
        var tekst = document.getElementById("forma").ime_input.value;
        var test = tekst.match(pattern);

        if (test == null) {
          document.getElementById("ime_error").classList.remove("hidden");
          valid_test = false;
      } else{
        console.log("validirano ime");
        document.getElementById("ime_error").classList.add("hidden");
      }
    }

    //REGEX VALIDACIJA ZA TELEFON
      function validiraj_tel(){

        var pattern = /^[0-9+]{9,15}$/;
        var tekst = document.getElementById("forma").tel_input.value;
        var test = tekst.match(pattern);

        if (test == null) {
          document.getElementById("tel_error").classList.remove("hidden");
          valid_test = false;
      } else{
        console.log("validiran tel");
        document.getElementById("tel_error").classList.add("hidden");
      }
    }

    //REGEX VALIDACIJA ZA MAIL
      function validiraj_mail(){

        var pattern = /^[a-zA-Z0-9]+@[a-z]{2,10}\.[a-z]{2,4}$/;
        var tekst = document.getElementById("forma").mail_input.value;
        var test = tekst.match(pattern);

        if (test == null) {
          document.getElementById("mail_error").classList.remove("hidden");
          valid_test = false;
      } else{
        console.log("validiran mail");
        document.getElementById("mail_error").classList.add("hidden");
      }
    }

    //REGEX VALIDACIJA ZA PASS
      function validiraj_pass(){

        var pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        var tekst = document.getElementById("forma").pass_input.value;
        var test = tekst.match(pattern);

        if (test == null) {
          document.getElementById("pass_error").classList.remove("hidden");
          valid_test = false;
      } else{
        console.log("validiran pass");
        document.getElementById("pass_error").classList.add("hidden");
      }
    }

    //OBJAVI POST
      async function objavi_post(){
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
            var x = await axios.post("http://localhost:3000/api/posts",newPost);
        }
        catch(err){
            console.log(err);
        }
        alert("Post vam je uspesno objavljen.");
        window.location.href = "dogadjaji.html";
      }