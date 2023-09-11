const express = require('express');
const fs = require('fs');

const app = express();
const port = 3002;

// Middleware for JSON parsing
app.use(express.json());

// Endpoint for getting city data
app.get('/kunta-data', (req, res) => {
  fs.readFile('kunnat.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Virhe tiedoston lukemisessa:', err);
      res.status(500).json({ error: 'Tiedoston lukemisessa tapahtui virhe' });
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      // Muodosta uusi taulukko, joka sisältää vain nimi, lat ja lon
      const cityData = jsonData.map(({ nimi, lat, lon }) => ({ nimi, lat, lon }));
      res.json(cityData);
    } catch (err) {
      console.error('Virhe JSON-muunnoksessa:', err);
      res.status(500).json({ error: 'Virhe JSON-muunnoksessa' });
    }
  });
});

app.listen(port, () => {
  console.log(`Palvelin käynnissä osoitteessa http://localhost:${port}`);
});