const https = require('https');

const domainName = 'prisma.fi'; // Voit vaihtaa tähän haluamasi domain-nimen

const apiUrl = `https://domainhakuapi.zoner.fi/wp-json/domainhaku/v1/status?whois&domain=${domainName}`;

https.get(apiUrl, (response) => {
  let data = '';

  // Käsitellään vastaanotettu data
  response.on('data', (chunk) => {
    data += chunk;
  });

  // Kun koko vastaus on vastaanotettu
  response.on('end', () => {
    // Tulostetaan koko vastaus tekstimuodossa konsoliin
    console.log(data);
  });
}).on('error', (error) => {
  console.error('Virhe HTTP-pyynnössä:', error.message);
});