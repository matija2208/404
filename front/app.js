const chk = document.getElementById('chk');

        chk.addEventListener('change', () => {

          document.body.classList.toggle('dark');

          document.getElementById("navbar").classList.toggle('darknav');
        
          try{document.getElementById("formaDiv").classList.toggle('forma');
          document.getElementById("formaDiv").classList.toggle('darkforma');} catch(err){}

          try{document.getElementById("dodajobjavu").classList.toggle('darkadd-button');
          document.getElementById("dodajobjavu").classList.toggle('add-button');}catch(err){}

          try{document.getElementById("i-naslov").classList.toggle('index-naslov');
          document.getElementById("i-naslov").classList.toggle('index-naslov-dark');}catch(err){}

          try{document.getElementById("i-paragraf").classList.toggle('index-p');
          document.getElementById("i-paragraf").classList.toggle('index-p-dark');}catch(err){}

        });
        
/*-------------------------------------------------------------------------------*/
