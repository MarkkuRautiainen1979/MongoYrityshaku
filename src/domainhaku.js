const https = require('https');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Anna yrityksen nimi: ', (companyName) => {
  const apiUrl = `https://domainhakuapi.zoner.fi/wp-json/domainhaku/v1/status?whois&domain=`;

  https.get(apiUrl, (response) => {
    let data = '';

    // Käsitellään vastaanotettu data
    response.on('data', (chunk) => {
      data += chunk;
    });

    // Kun koko vastaus on vastaanotettu
    response.on('end', () => {
      // Etsitään "name" -kohdan ja "holder name" -kohdan arvot tekstinä
      const lines = data.split('\n');
      let nameValue = '';
      let holderNameValue = '';

      for (const line of lines) {
        if (line.startsWith('name...............:')) {
          nameValue = line.replace('name...............:', '').trim();
        }
        if (line.startsWith('holder name........:')) {
          holderNameValue = line.replace('holder name........:', '').trim();
        }
      }

      if (nameValue && holderNameValue && holderNameValue === companyName) {
        // Tulostetaan "name" -kohdan arvo konsoliin
        console.log(`Yrityksellä on domain osoite: ${nameValue}`);
      } else {
        console.error('Yrityksen nimellä ei löytynyt domain-osoitetta.');
      }

      rl.close();
    });
  }).on('error', (error) => {
    console.error('Virhe HTTP-pyynnössä:', error.message);
    rl.close();
  });
});