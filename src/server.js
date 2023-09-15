const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3001;

const url = 'mongodb://127.0.0.1:27017'; // MongoDB-ympäristön URL ja portti
const dbName = 'Suomenohjelmistoyritykset'; // Tietokannan nimi
const kokoelma = 'kaikki_yritystiedot'; // Kokoelman nimi

// Yhdistä tietokantaan
mongoose.connect(`${url}/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Virhe yhdistettäessä tietokantaan:'));
db.once('open', async () => {
  console.log('Yhdistettiin MongoDB-tietokantaan');

  // Luo schema ja model
  const itemSchema = new mongoose.Schema({
    Y_tunnus: String,
    Nimi: String,
    Rekisterointi_pvm: Date,
    Yhtiomuoto: String,
    Toimiala: String,
    Kaupunki: String,
    Osoite: String,
    Yhteystiedot: String
  });

  app.use(cors());

 //  Luo reitti, joka palauttaa tietokannan tulokset
  app.get('/items', async (req, res) => {
   try {
     const Item = mongoose.model(kokoelma, itemSchema);
     const items = await Item.find({}).exec();
     res.json(items);
   } catch (err) {
     console.error('Virhe kyselyssä:', err);
     res.status(500).json({ error: 'Virhe haettaessa tietoja tietokannasta' });
   }
  });

// app.get('/items', (req, res) => {
  // Simuloidaan JSON-dataa
//  const jsonData = { message: 'Tämä on JSON-dataa' };

  // Asetetaan sisältötyyppi JSON:ksi
//  res.setHeader('Content-Type', 'application/json');
  
  // Lähetetään JSON-data
//  res.json(jsonData);
// });


  app.listen(port, () => {
    console.log(`Palvelin kuuntelee portissa ${port}`);
  });
});