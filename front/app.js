const chk = document.getElementById('chk');

        chk.addEventListener('change', () => {

          document.body.classList.toggle('dark');

          document.getElementById("navbar").classList.toggle('darknav');
        
          document.getElementById("formaDiv").classList.toggle('forma');
          document.getElementById("formaDiv").classList.toggle('darkforma');

          document.getElementById("dodajobjavu").classList.toggle('darkadd-button');
          document.getElementById("dodajobjavu").classList.toggle('add-button');

        });
        
/*-------------------------------------------------------------------------------*/
