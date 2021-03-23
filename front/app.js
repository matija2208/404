const chk = document.getElementById('chk');

        chk.addEventListener('change', () => {

          document.body.classList.toggle('dark');

          document.getElementById("navbar").classList.toggle('darknav');

        });
/*---------------------objava----------------*/
const addButton = document.querySelector(".add-button");
addButton.addEventListener("click", GetInput);

async function GetInput() {
    const imeInput = document.querySelector("#ime-input");
    const imeError = document.querySelector("#ime-error");
    const tehInput = document.querySelector("#tehnologije-input");
    const tehError = document.querySelector("#tehnologije-error");

    const ime = imeInput.value;
    const teh = tehInput.value.split(",");

    let error = false;

    if (ime.length < 4) {
        imeError.classList.remove("hidden");
        imeError.innerHTML = "Ime mora da sadrzi bar 4 karaktera!";
        error = true;
    } else {
        imeError.classList.add("hidden");
    }

    if (teh.length < 2) {
        tehError.classList.remove("hidden");
        tehError.innerHTML = "Potrebno je uneti bar 2 tehnologije!";
        error = true;
    } else {
        tehError.classList.add("hidden");
    }

    if (error) return;

    let tim = {
        ime: ime,
    };

    let noviTim;

    try {
        noviTim = await axios.post("api/timovi", tim);
    } catch (err) {
        console.log(err);
    }

    try {
        for (let i = 0; i < teh.length; i++) {
            let timZaTeh = {
                timId: noviTim.data.tim._id,
                tehnologija: teh[i],
            };

            await axios.post("api/tehnologija", timZaTeh);
        }
    } catch (err) {
        console.log(err);
    }

    window.location.href = "index.html";
}