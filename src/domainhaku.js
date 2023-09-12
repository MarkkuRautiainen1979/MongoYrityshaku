const https = require('https');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Anna .fi loppuisen verkkotunnuksen nimi , (älä kirjoita alkuun www. vaan pelkästään esim. nokia.fi:) ', (domainName) => {
  const apiUrl = `https://domainhakuapi.zoner.fi/wp-json/domainhaku/v1/status?whois&domain=${domainName}`;

  https.get(apiUrl, (response) => {
    let data = '';

    // Käsitellään vastaanotettu data
    response.on('data', (chunk) => {
      data += chunk;
    });

    // Kun koko vastaus on vastaanotettu
    response.on('end', () => {
      // Etsitään "name" -kohdan arvoa tekstinä
      const lines = data.split('\n');
      let nameValue = '';
      let expiressValue = '';
      let addressValue = '';
      let postalValue = '';
      let cityValue = '';
 //     let phoneValue = '';
 //     let emailValue = '';

      for (const line of lines) {
        if (line.startsWith('name...............:')) {
          nameValue = line.replace('name...............:', '').trim();
          break;
        }
      }

      for (const line of lines) {
        if (line.startsWith('expires............:')) {
          expiressValue = line.replace('expires............:', '').trim();
          break;
        }
      }

      for (const line of lines) {
        if (line.startsWith('address............:')) {
          addressValue = line.replace('address............:', '').trim();
          break;
        }
      }

      for (const line of lines) {
        if (line.startsWith('postal.............:')) {
          postalValue = line.replace('postal.............:', '').trim();
          break;
        }
      }

      for (const line of lines) {
        if (line.startsWith('city...............:')) {
          cityValue = line.replace('city...............:', '').trim();
          break;
        }
      }


      if (nameValue) {
        // Tulostetaan "name" -kohdan arvo konsoliin
        console.log('Domain on varattu', nameValue,'-nimiselle haltijalle');
        console.log('Domain varaus umpeutuu :',expiressValue)
        console.log('Haltijan osoite : ',addressValue , postalValue , cityValue )
      } else {
        console.error('Ei löytynyt varattuna listasta, domain saattaa olla vapaa');
      }

      rl.close();
    });
  }).on('error', (error) => {
    console.error('Virhe HTTP-pyynnössä:', error.message);
    rl.close();
  });
});