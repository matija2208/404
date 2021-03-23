const express = require("express");
const app = express();
const connect_baza = require("./baza/baza");

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server slusa na portu: ${PORT}`);
});

//konekcija sa bazom
connect_baza();

// Sa JSON
app.use(express.json());