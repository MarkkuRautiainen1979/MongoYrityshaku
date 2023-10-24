const fs = require('fs');
const axios = require('axios');

// Osoite, josta haetaan JSON-tiedot
const xurl = 'https://avoindata.prh.fi/bis/v1?totalResults=false&maxResults=3&resultsFrom=0&businessLineCode=62&companyRegistrationFrom=2023-08-01';

// Tehdään HTTP GET -pyyntö määriteltyyn osoitteeseen
axios.get(xurl)
  .then(response => {
    const data = response.data;  // Saatu vastausdata

    // Tallenna JSON-tiedosto levylle
    const jsonContent = JSON.stringify(data, null, 2); 
    fs.writeFileSync('testifirmat.json', jsonContent); // Tallennetaan tiedosto nimellä 'testifirmat.json'

    console.log('Data tallennettu tiedostoon');

    // Luetaan tallennettu JSON-tiedosto
    fs.readFile('testifirmat.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Virhe tiedoston lukemisessa:', err);
        return;
      }

      const ohjelmisto_data_list = JSON.parse(data);
      const kaikki_tiedot = [];

      // Käydään läpi kaikki tietueet ja tehdään pyynnöt tietojen hakemiseksi
      ohjelmisto_data_list.results.forEach(tietue => {
        const business_id = tietue.businessId;
        const url = `http://avoindata.prh.fi/bis/v1/${business_id}`;

        axios.get(url)
          .then(response => {
            const data = response.data;

            const tiedot = {
              businessId: data.results[0].businessId,
              name: data.results[0].names[0].name,
              registrationDate: data.results[0].registrationDate,
              city: data.results[0].addresses[0].city,
              street: data.results[0].addresses[0].street
            };

            kaikki_tiedot.push(tiedot);

            // Kun kaikki tiedot on haettu, tallennetaan ne JSON-tiedostoon
            if (kaikki_tiedot.length === ohjelmisto_data_list.results.length) {
              const jsonContent = JSON.stringify(kaikki_tiedot, null, 2);
              fs.writeFileSync('kaikki_yritystiedot.json', jsonContent);

              console.log('Data tallennettu tiedostoon');
            }
          })
          .catch(error => {
            console.error('Virhe:', error);
          });
      });
    });
  })
  .catch(error => {
    console.error('Virhe:', error);
  });